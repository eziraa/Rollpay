/* eslint-disable react-hooks/exhaustive-deps */
import { Title, TitleContainer } from "../see-employee/see-employee.style";
import {
  Item,
  UserProfileBody,
  UserProfileContent,
  UserProfileHeader,
} from "./user-profile.style";

import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
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

const UserProfile = () => {
  const employee = useSalary().curr_emp?.employee;
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
    employee_id && dispatcher(getCurrEmpPaymentInfo(employee_id));
  }, [employee_id]);

  return (
    <UserProfileBody>
      <UserProfileHeader>
        <TitleContainer>
          <Item>
            <Title>My Profile</Title>
          </Item>
        </TitleContainer>
        <NavigationBar />
        <Label
          style={{
            position: "absolute",
            right: "2rem",
            top: "1rem",
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
                      new Date(
                        `${query_year || current_year}-${
                          query_month || current_month
                        }-01`
                      )
                    )}
                  </SelectOption>
                )
            )}
          </Select>
        </Label>
      </UserProfileHeader>
      <UserProfileContent>
        {employee && <EmployeeProfile employee={employee} />}
        <Outlet />
      </UserProfileContent>
    </UserProfileBody>
  );
};

export default UserProfile;
