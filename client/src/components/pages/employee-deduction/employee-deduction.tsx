/* eslint-disable react-hooks/rules-of-hooks */

import { useAppDispatch } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { resetCurrEmployee } from "../../../store/employee/employee-slice";
import { EmployeeDeduction } from "../../sections/employee-deduction/deduction";
import { useEffect } from "react";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import LeftMenu from "../../sections/left-menu/left-menu";
import { Header } from "../../sections/header/header";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import {
  BackButton,
  EditEmployeeContent,
  SeeEmployeeBody,
  SeeEmployeeContainer,
  SeeEmployeeHeader,
  Title,
  TitleContainer,
} from "../see-employee/see-employee.style";
import { SEE_EMP_DEDUCTION } from "../../../constants/tasks";

export const EmployeeDeductionPage = () => {
  const dispatcher = useAppDispatch();
  useEffect(() => {
    const curr_emp_id = localStorage.getItem("curr_emp_id");
    curr_emp_id && dispatcher(getCurrEmpPaymentInfo(curr_emp_id));
  }, []);
  return (
    <SeeEmployeeContainer>
      <Header />
      <SeeEmployeeBody>
        <LeftMenu current_menu={SEE_EMP_DEDUCTION} />
        <MainContainer>
          <SeeEmployeeHeader>
            <TitleContainer>
              <BackButton
                onClick={() => {
                  dispatcher(resetCurrEmployee());
                }}
              >
                <IoChevronBackCircleOutline />
              </BackButton>
              <Title>Edit Employee</Title>
            </TitleContainer>
            <NavigationBar />
          </SeeEmployeeHeader>
          <EditEmployeeContent>
            <EmployeeProfile />
            <EmployeeDeduction />
          </EditEmployeeContent>
        </MainContainer>
      </SeeEmployeeBody>
    </SeeEmployeeContainer>
  );
};
