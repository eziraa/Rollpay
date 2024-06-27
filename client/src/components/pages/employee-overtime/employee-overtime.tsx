/* eslint-disable react-hooks/rules-of-hooks */

import { IoChevronBackCircleOutline } from "react-icons/io5";

import { MainContainer } from "../../utils/pages-utils/containers.style";
import LeftMenu from "../../sections/left-menu/left-menu";
import { Header } from "../../sections/header/header";
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
import { SEE_EMP_DEDUCTION, SEE_EMP_OVERTIME } from "../../../constants/tasks";
import { EmployeeOvertime } from "../../sections/employee-overtime/overtime";
import { useNavigate } from "react-router";

export const EmployeeDeductionPage = () => {
  const navigate = useNavigate();
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
                  navigate(-1);
                }}
              >
                <IoChevronBackCircleOutline />
              </BackButton>
              <Title> Employee Overtime</Title>
            </TitleContainer>
            <NavigationBar current_nav={SEE_EMP_OVERTIME} />
          </SeeEmployeeHeader>
          <EditEmployeeContent>
            <EmployeeProfile />
            <EmployeeOvertime />
          </EditEmployeeContent>
        </MainContainer>
      </SeeEmployeeBody>
    </SeeEmployeeContainer>
  );
};
