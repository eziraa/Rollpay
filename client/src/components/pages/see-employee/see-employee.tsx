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
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSalary } from "../../../hooks/salary-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";

export const SeeEmployee = () => {
  //Calling hooks and getting necessary information
  const { employee_id } = useParams();
  const employee = useSalary().curr_emp?.employee;
  const dispatcher = useAppDispatch();

  // Mock data for employee profile
  useEffect(() => {
    employee_id && dispatcher(getCurrEmpPaymentInfo(employee_id));
  }, []);
  return (
    <MainContainer>
      <SeeEmployeeHeader>
        <TitleContainer>
          <Title>Current Employee</Title>
        </TitleContainer>
        <NavigationBar />
      </SeeEmployeeHeader>
      <CurrEmployeeContent>
        {employee && <EmployeeProfile employee={employee} />}
        <Outlet />
      </CurrEmployeeContent>
    </MainContainer>
  );
};
