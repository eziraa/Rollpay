/* eslint-disable react-hooks/exhaustive-deps */
import {
  Caption,
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "./allowance.style";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { ThreeDots } from "../../utils/loading/dots";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useSalary } from "../../../hooks/salary-hook";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { useEffect } from "react";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { useUser } from "../../../hooks/user-hook";
import { removeSalaryAssetRequested } from "../../../store/employee/employee-slice";
import { stringDay } from "../../utils/day/string-day";

export const EmployeeAllowance = () => {
  //--- Calling hooks and getting necessary information ---
  const { curr_emp, task_finished } = useSalary();
  const navigate = useNavigate();
  const dispatcher = useAppDispatch();
  const { pathname } = useLocation();
  const { user } = useUser();

  const { year, month, changeYear, changeMonth } = useYearMonthPagination();

  const { year: curr_year, month: curr_month, employee_id } = useParams();
  const baseUrl = curr_year
    ? pathname.slice(0, pathname.indexOf("/" + curr_year + "/"))
    : pathname;
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(2022);
    !month && changeMonth(1);
    year && month && navigate(`${baseUrl}/${year}/${month}`);
  }, [year, month]);

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
    <AllowanceContainer>
      <AllowanceHeader>
        <Outlet />
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
        {user?.role === "Clerk" && (
          <AddButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("add-allowance");
            }}
          >
            Add
          </AddButton>
        )}
      </AllowanceHeader>
      <AllowanceBody>
        {!task_finished ? (
          <ThreeDots size={2} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.allowances.length === 0
          ) ? (
          <div>
            <NoResult>No allowances found </NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.allowances.length > 0 ? (
              <CustomTable key={index}>
                <thead>
                  <tr>
                    <Caption>
                      {getFormattedMonth(new Date(payment.month))}
                    </Caption>
                  </tr>
                  <TableHeader>
                    <HeaderTitle>Allowance Name</HeaderTitle>
                    <HeaderTitle>Allowance Value</HeaderTitle>
                    <HeaderTitle>Date of Given</HeaderTitle>
                    <HeaderTitle>Action</HeaderTitle>
                  </TableHeader>
                </thead>
                <TableBody>
                  {payment.allowances.map((allowance, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{allowance.allowance_type}</TableData>
                        <TableData className=" italic">
                          {allowance.allowance_rate}%
                        </TableData>
                        <TableData className=" italic">
                          {stringDay(new Date(allowance.date_of_given))}
                        </TableData>
                        <TableData>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatcher(
                                removeSalaryAssetRequested({
                                  employee_id: curr_emp.employee.id,
                                  asset_type: "allowance",
                                  asset_id: allowance.id,
                                  qury_string: `?year=${
                                    payment.month.split("-")[0]
                                  }&month=${payment.month.split("-")[1]}`,
                                })
                              );
                            }}
                          >
                            <span className="fail">Remove</span>
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
                <NoResult>No Allowance</NoResult>
              </div>
            );
          })
        )}
      </AllowanceBody>
    </AllowanceContainer>
  );
};
