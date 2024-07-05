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
  OvertimeBody,
  OvertimeContainer,
  OvertimeHeader,
  OvertimeTitle,
} from "./overtime.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { ThreeDots } from "../../utils/loading/dots";
import { listOvertimesRequested } from "../../../store/overtime/overtime-slice";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";

export const EmployeeOvertime = () => {
  //Callig hooks and getting necessary information
  const { curr_emp, task_finished } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { year, month, changeYear, changeMonth } = useYearMonthPagination();
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(2022);
    !month && changeMonth(1);
    year &&
      month &&
      navigate(pathname.split("overtimes")[0] + `overtimes/${year}/${month}`);
  }, [year, month]);
  const { year: curr_year, month: curr_month, employee_id } = useParams();

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
    <OvertimeContainer>
      <OvertimeHeader>
        <Outlet />
        <OvertimeTitle>Employee Overtime</OvertimeTitle>
        <AddButton
          onClick={(e) => {
            e.stopPropagation();
            dispatcher(listOvertimesRequested());
            navigate("add-overtime");
          }}
        >
          Add
        </AddButton>
      </OvertimeHeader>
      <OvertimeBody>
        {!task_finished ? (
          <ThreeDots size={2} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.overtimes.length === 0
          ) ? (
          <div>
            <NoResult>No overtimes found for all month</NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.overtimes.length > 0 ? (
              <CustomTable key={index}>
                <thead>
                  <tr>
                    <Caption>
                      {getFormattedMonth(new Date(payment.month))}
                    </Caption>
                  </tr>
                  <TableHeader>
                    <HeaderTitle>Overtime Name</HeaderTitle>
                    <HeaderTitle>Overtime Value</HeaderTitle>
                    <HeaderTitle>Length of Time</HeaderTitle>
                    <HeaderTitle>Date of Given</HeaderTitle>
                  </TableHeader>
                </thead>
                <TableBody>
                  {payment.overtimes.map((overtime, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{overtime.overtime_type}</TableData>
                        <TableData>{overtime.overtime_rate}</TableData>
                        <TableData>{overtime.length}</TableData>
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
                <NoResult>No Overtime</NoResult>
              </div>
            );
          })
        )}
      </OvertimeBody>
    </OvertimeContainer>
  );
};
