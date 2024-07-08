/* eslint-disable react-hooks/exhaustive-deps */
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  Caption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  DeductionBody,
  DeductionContainer,
  DeductionHeader,
  DeductionTitle,
} from "./deduction.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { listDeductionsRequested } from "../../../store/deduction/deduction-slice";
import { ThreeDots } from "../../utils/loading/dots";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { useEffect } from "react";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";

export const EmployeeDeduction = () => {
  //Calling hooks and getting nucessary information
  const { curr_emp, task_finished } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { year, month, changeYear, changeMonth } = useYearMonthPagination();
  const { year: curr_year, month: curr_month, employee_id } = useParams();

  // Getting necessary information
  const baseUrl = curr_year
    ? pathname.slice(0, pathname.indexOf("/" + curr_year + "/"))
    : pathname;
  // Defining use effect to navigate when there is chnage in the year and month
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(2022);
    !month && changeMonth(1);
    year && month && navigate(`${baseUrl}/${year}/${month}`);
  }, [year, month]);

  // Defining use effect to fetch employee information when there is chnage in the year and month
  useEffect(() => {
    if (curr_year && curr_month) {
      dispatcher(
        getCurrEmpPaymentInfo(`${employee_id}/${curr_year}/${curr_month}`)
      );
    } else {
      employee_id &&
        dispatcher(
          getCurrEmpPaymentInfo(
            `${employee_id}/${2024}/${new Date(Date.now()).getMonth()}`
          )
        );
    }
  }, [curr_year, curr_month]);
  return (
    <DeductionContainer>
      <Outlet />
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(baseUrl + "/add-deduction");
            dispatcher(listDeductionsRequested());
          }}
        >
          Add
        </AddButton>
      </DeductionHeader>
      <DeductionBody>
        {!task_finished ? (
          <ThreeDots size={2} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.deductions.length === 0
          ) ? (
          <div>
            <NoResult>No deductions found for all month</NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.deductions.length > 0 ? (
              <CustomTable key={index}>
                <thead>
                  <tr>
                    <Caption>
                      {getFormattedMonth(new Date(payment.month))}
                    </Caption>
                  </tr>
                  <TableHeader>
                    <HeaderTitle>Deduction Name</HeaderTitle>
                    <HeaderTitle>Deduction Value</HeaderTitle>
                    <HeaderTitle>Date of Given</HeaderTitle>
                  </TableHeader>
                </thead>
                <TableBody>
                  {payment.deductions.map((deduction, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{deduction.deduction_type}</TableData>
                        <TableData>{deduction.deduction_rate}</TableData>
                        <TableData>
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </CustomTable>
            ) : (
              <div>
                <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
                <NoResult>No Deduction</NoResult>
              </div>
            );
          })
        )}
      </DeductionBody>
    </DeductionContainer>
  );
};
