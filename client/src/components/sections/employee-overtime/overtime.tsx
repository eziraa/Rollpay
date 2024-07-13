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
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { useUser } from "../../../hooks/user-hook";
import { removeSalaryAssetRequested } from "../../../store/employee/employee-slice";
import { stringDay } from "../../utils/day/string-day";

export const EmployeeOvertime = () => {
  //Callig hooks and getting necessary information
  const { curr_emp, task_finished } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { year, month, changeYear, changeMonth } = useYearMonthPagination();
  const { year: query_year, month: query_month, employee_id } = useParams();
  const { user } = useUser();

  // Getting the current month and year
  const now = new Date(Date.now());
  const current_year = now.getFullYear();
  const current_month = now.getMonth() + 1;
  // Getting the base URL
  const baseUrl = query_year
    ? pathname.slice(0, pathname.indexOf("/" + query_year + "/"))
    : pathname;
  // Defining a ue effect to naviagate when there is a month or year change
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(current_year);
    !month && changeMonth(current_month);
    year && month && navigate(`${baseUrl}/${year}/${month}`);
  }, [year, month]);

  //Defining a use effect to fetch an employee information based on the year and month
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
    <OvertimeContainer>
      <OvertimeHeader>
        <Outlet />
        <OvertimeTitle>Employee Overtime</OvertimeTitle>
        {user?.role === "Clerk" && (
          <AddButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("add-overtime");
            }}
          >
            Add
          </AddButton>
        )}
      </OvertimeHeader>
      <OvertimeBody>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.overtimes.length === 0
          ) ? (
          <div>
            <NoResult>No overtimes found </NoResult>
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
                    <HeaderTitle>Start at</HeaderTitle>
                    <HeaderTitle>End at</HeaderTitle>
                    <HeaderTitle>Length of Time</HeaderTitle>
                    <HeaderTitle>Action</HeaderTitle>
                  </TableHeader>
                </thead>
                <TableBody>
                  {payment.overtimes.map((overtime, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{overtime.overtime_type}</TableData>
                        <TableData className="center-text italic">
                          {overtime.overtime_rate}%
                        </TableData>
                        <TableData>
                          {stringDay(new Date(overtime.start_time))}
                        </TableData>
                        <TableData>
                          {stringDay(new Date(overtime.end_time))}
                        </TableData>
                        <TableData className="center-text italic">
                          {overtime.length_of_overtime} hour
                        </TableData>
                        <TableData>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatcher(
                                removeSalaryAssetRequested({
                                  employee_id: curr_emp.employee.id,
                                  asset_type: "overtime",
                                  asset_id: overtime.id,
                                  qury_string: `?year=${
                                    payment.month.split("-")[0]
                                  }&month=${payment.month.split("-")[1]}`,
                                })
                              );
                            }}
                          >
                            <span className="fail italic">Remove</span>
                          </span>
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
