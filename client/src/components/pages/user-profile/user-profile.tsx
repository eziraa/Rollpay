/* eslint-disable react-hooks/exhaustive-deps */
import {
  CurrEmployeeContent,
  SeeEmployeeHeader,
} from "../see-employee/see-employee.style";

import { Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../../utils/custom-hook";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { useSalary } from "../../../hooks/salary-hook";
import { getCurrentEmployeeRequest } from "../../../store/employee/employee-slice";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import {
  Label,
  Select,
  SelectOption,
} from "../../utils/form-elements/form.style";
import { getNamedMonth } from "../salary/utils";
import { MainContainer } from "../../utils/pages-utils/containers.style";

const UserProfile = () => {
  const employee = useSalary().curr_emp?.employee;
  const { pathname } = useLocation();

  const { year: query_year, month: query_month, employee_id } = useParams();
  const dispatcher = useAppDispatch();
  const {
    year: curr_year,
    month: curr_month,
    changeMonth,
    changeYear,
  } = useYearMonthPagination();

  // Getting current month and year
  const now = new Date(Date.now());
  // Implementing year-month pagination
  const start_year = 2022;
  const current_year = now.getFullYear();
  const years = Array.from(
    { length: current_year - start_year + 1 },
    (_, index) => start_year + index
  );

  const start_month = 1;
  const current_month = now.getMonth() + 1;
  const months = Array.from(
    { length: current_month - start_month + 1 },
    (_, index) => start_month + index
  );

  // Defining a useEffect to get the infomration of current employee

  useEffect(() => {
    employee_id && dispatcher(getCurrentEmployeeRequest(employee_id));
  }, [employee_id]);
  return (
    <MainContainer
      style={{
        flexDirection: "row",
        alignItems: "start",
      }}
    >
      {employee && <EmployeeProfile employee={employee} />}
      <CurrEmployeeContent
        style={{
          flexDirection: "column",
        }}
      >
        <SeeEmployeeHeader>
          <NavigationBar />
          {!["salary-history", "position-history", "assets"].includes(
            pathname.split("/").slice(-1)[0]
          ) && (
            <Label
              style={{
                fontSize: "1.5rem",
                display: "flex",
                gap: "1rem",
              }}
            >
              <Select
                value={`${query_year || current_year}`}
                onChange={(e) => {
                  changeYear(+e.target.value);
                }}
              >
                {years.map((year) => (
                  <SelectOption key={year} value={`${year}`}>
                    {year}
                  </SelectOption>
                ))}
              </Select>
              <Select
                value={`${query_month || curr_month}`}
                onChange={(e) => {
                  changeMonth(+e.target.value);
                }}
              >
                {months.map(
                  (month) =>
                    ((curr_year && curr_year < current_year) ||
                      month <= new Date(Date.now()).getMonth() + 1) && (
                      <SelectOption key={month} value={`${month}`}>
                        {getNamedMonth(
                          new Date(`${query_year || current_year}-${month}-01`)
                        )}
                      </SelectOption>
                    )
                )}
              </Select>
            </Label>
          )}
        </SeeEmployeeHeader>

        <Outlet />
      </CurrEmployeeContent>
    </MainContainer>
  );
};

export default UserProfile;
