/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  CurrEmployeeContent,
  Title,
  SeeEmployeeHeader,
  TitleContainer,
} from "./see-employee.style";

import { MainContainer } from "../../utils/pages-utils/containers.style";

import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import { Outlet } from "react-router-dom";
import { useSalary } from "../../../hooks/salary-hook";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { Label } from "../edit-employee/edit-employee.style";
import { Select, SelectOption } from "../../utils/form-elements/form.style";
import { getNamedMonth } from "../salary/utils";

export const SeeEmployee = () => {
  //Calling hooks and getting necessary information
  const employee = useSalary().curr_emp?.employee;
  const {
    year: curr_year,
    month: curr_month,
    changeMonth,
    changeYear,
  } = useYearMonthPagination();

  // Implementing year-month pagination
  const start_year = 2022;
  const end_year = 2024;
  const years = Array.from(
    { length: end_year - start_year + 1 },
    (_, index) => start_year + index
  );

  const start_month = 1;
  const end_month = 12;
  const months = Array.from(
    { length: end_month - start_month + 1 },
    (_, index) => start_month + index
  );

  return (
    <MainContainer>
      <SeeEmployeeHeader>
        <TitleContainer>
          <Title>Current Employee</Title>
        </TitleContainer>
        <NavigationBar />
        <Label
          style={{
            position: "absolute",
            right: "2rem",
            top: "10px",
            fontSize: "1.5rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Select
            value={`${curr_year}`}
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
            value={`${curr_month}`}
            onChange={(e) => {
              changeMonth(+e.target.value);
            }}
          >
            {months.map(
              (month) =>
                ((curr_year && curr_year < end_year) ||
                  month <= new Date(Date.now()).getMonth()) && (
                  <SelectOption key={month} value={`${month}`}>
                    {getNamedMonth(new Date(`${curr_year}-${month}-01`))}
                  </SelectOption>
                )
            )}
          </Select>
        </Label>
      </SeeEmployeeHeader>
      <CurrEmployeeContent>
        {employee && <EmployeeProfile employee={employee} />}
        <Outlet />
      </CurrEmployeeContent>
    </MainContainer>
  );
};
