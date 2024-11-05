/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { CurrEmployeeContent, SeeEmployeeHeader } from "./see-employee.style";

import { MainContainer } from "../../utils/pages-utils/containers.style";

import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { Label } from "../edit-employee/edit-employee.style";
import { Select, SelectOption } from "../../utils/form-elements/form.style";
import { getNamedMonth } from "../salary/utils";
import { useEffect } from "react";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getCurrentEmployeeRequest } from "../../../store/employee/employee-slice";
import { useEmployee } from "../../../hooks/employee-hook";

export const SeeEmployee = () => {
  //Calling hooks and getting necessary information
  const employee = useEmployee().curr_emp;
  const { employee_id } = useParams();
  const dispatcher = useAppDispatch();
  const { pathname } = useLocation();
  const { year, month, changeMonth, changeYear } = useYearMonthPagination();

  // Implementing year-month pagination
  const now = new Date(Date.now());
  const start_year = 2022;
  const current_year = now.getFullYear();

  const years = Array.from(
    { length: current_year - start_year + 1 },
    (_, index) => start_year + index
  );

  const current_month = now.getMonth() + 1;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
          {!["edit", "salary-history", "position-history", "assets"].includes(
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
                value={`${year || current_year}`}
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
                value={`${month || current_month}`}
                onChange={(e) => {
                  changeMonth(+e.target.value);
                }}
              >
                {months.map(
                  (month) =>
                    ((year && year < current_year) ||
                      month <= current_month) && (
                      <SelectOption key={month} value={`${month}`}>
                        {getNamedMonth(new Date(`${year}-${month}-01`))}
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
