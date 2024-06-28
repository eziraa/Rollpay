/* eslint-disable react-hooks/rules-of-hooks */

import {
  BackButton,
  EditEmployeeContent,
  Title,
  SeeEmployeeHeader,
  TitleContainer,
  SeeEmployeeBody,
  SeeEmployeeContainer,
  Container,
} from "./see-employee.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { EmployeeAllowance } from "../../sections/employee-allowance/allowance";
import { resetCurrEmployee } from "../../../store/employee/employee-slice";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import LeftMenu from "../../sections/left-menu/left-menu";
import { Header } from "../../sections/header/header";
import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import { SEE_EMPLOYEE, SEE_EMP_ALLOWANCE } from "../../../constants/tasks";
import UpdateEmployee from "./update-employee";

export const SeeEmployee = () => {
  const dispatcher = useAppDispatch();
  return (
    <SeeEmployeeContainer>
      <Header />
      <SeeEmployeeBody>
        <LeftMenu current_menu={SEE_EMPLOYEE} />
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
            <NavigationBar current_nav={SEE_EMP_ALLOWANCE} />
          </SeeEmployeeHeader>
          <EditEmployeeContent>
            <Container>
              <EmployeeProfile />
              <UpdateEmployee />
            </Container>

            <EmployeeAllowance />
          </EditEmployeeContent>
        </MainContainer>
      </SeeEmployeeBody>
    </SeeEmployeeContainer>
  );
};
