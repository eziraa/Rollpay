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
import { ThreeDots } from "../../utils/loading/dots";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { useEffect } from "react";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { useUser } from "../../../hooks/user-hook";
import { removeSalaryAssetRequested } from "../../../store/employee/employee-slice";
import { stringDay } from "../../utils/day/string-day";
import { IoAddOutline } from "react-icons/io5";

export const EmployeeDeduction = () => {
  //Calling hooks and getting nucessary information
  const { curr_emp, task_finished } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { year, month, changeYear, changeMonth } = useYearMonthPagination();
  const { year: query_year, month: query_month, employee_id } = useParams();
  const { user } = useUser();

  //Getting current monthand year
  const now = new Date(Date.now());
  const current_year = now.getFullYear();
  const current_month = now.getMonth() + 1;
  // Getting necessary information
  const baseUrl = query_year
    ? pathname.slice(0, pathname.indexOf("/" + query_year + "/"))
    : pathname;
  // Defining use effect to navigate when there is chnage in the year and month
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(current_year);
    !month && changeMonth(current_month);
    year && month && navigate(`${baseUrl}/${year}/${month}`);
  }, [year, month]);

  // Defining use effect to fetch employee information when there is chnage in the year and month
  useEffect(() => {
    if (query_year && query_month) {
      dispatcher(
        getCurrEmpPaymentInfo(`${employee_id}/${query_year}/${query_month}`)
      );
    } else {
      employee_id &&
        dispatcher(
          getCurrEmpPaymentInfo(
            `${employee_id}/${current_year}/${current_month}`
          )
        );
    }
  }, [query_year, query_month]);
  return (
    <DeductionContainer>
      <Outlet />
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
        {user?.role === "Clerk" && (
          <AddButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("add-deduction");
            }}
          >
            <IoAddOutline /> New
          </AddButton>
        )}
      </DeductionHeader>
      <DeductionBody>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.deductions.length === 0
          ) ? (
          <div>
            <NoResult>No deductions found </NoResult>
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
                    {user?.employee.position === "Clerk" && (
                      <HeaderTitle>Action</HeaderTitle>
                    )}
                  </TableHeader>
                </thead>
                <TableBody>
                  {payment.deductions.map((deduction, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{deduction.deduction_type}</TableData>
                        <TableData className="italic">
                          {deduction.deduction_rate}%
                        </TableData>
                        <TableData>
                          {stringDay(new Date(deduction.date_of_given))}
                        </TableData>
                        <TableData>
                          {user?.employee.position === "Clerk" && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatcher(
                                  removeSalaryAssetRequested({
                                    employee_id: curr_emp.employee.id,
                                    asset_type: "deduction",
                                    asset_id: deduction.id,
                                    qury_string: `?year=${
                                      payment.month.split("-")[0]
                                    }&month=${payment.month.split("-")[1]}`,
                                  })
                                );
                              }}
                            >
                              <span className="fail">Remove</span>
                            </span>
                          )}
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
