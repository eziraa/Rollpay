/* eslint-disable react-hooks/exhaustive-deps */
import { IoChevronBackCircleOutline } from "react-icons/io5";
import {
  BackButton,
  Title,
  TitleContainer,
} from "../see-employee/see-employee.style";
import {
  Item,
  UserProfileBody,
  UserProfileContent,
  UserProfileHeader,
} from "./user-profile.style";

import { FaRegUserCircle } from "react-icons/fa";
import { IconContainer } from "../../sections/profile/profile.style";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const employee = useSalary().curr_emp?.employee;
  //Calling hooks and getting necessary information
  // const employee = useEmployee().curr_emp;
  const { employee_id } = useParams();
  const dispatcher = useAppDispatch();
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

  // Defining a useEffect to get the infomration of current employee

  useEffect(() => {
    employee_id && dispatcher(getCurrentEmployeeRequest(employee_id));
  }, [employee_id]);
  useEffect(() => {
    employee_id && dispatcher(getCurrEmpPaymentInfo(employee_id));
  }, [employee_id]);
  return (
    <UserProfileBody>
      <UserProfileHeader>
        <TitleContainer>
          <BackButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoChevronBackCircleOutline />
          </BackButton>
          <Item>
            <IconContainer>
              <FaRegUserCircle />
            </IconContainer>
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
                  month <= new Date(Date.now()).getMonth() + 1) && (
                  <SelectOption key={month} value={`${month}`}>
                    {getNamedMonth(new Date(`${curr_year}-${month}-01`))}
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
