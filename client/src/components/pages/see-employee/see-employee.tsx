/* eslint-disable react-hooks/rules-of-hooks */

import {
  BackButton,
  CurrEmployeeContent,
  Title,
  SeeEmployeeHeader,
  TitleContainer,
  SeeEmployeeBody,
  SeeEmployeeContainer,
  Container,
} from "./see-employee.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { resetCurrEmployee } from "../../../store/employee/employee-slice";
import { MainContainer } from "../../utils/pages-utils/containers.style";

import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import UpdateEmployee from "./update-employee";
import { EmployeeAllowance } from "../../sections/employee-allowance/allowance";
import { Header } from "../../sections/header/header";
import LeftMenu from "../../sections/left-menu/left-menu";

export const SeeEmployee = () => {
  const dispatcher = useAppDispatch();
  return (
    <SeeEmployeeContainer>
      <Header />
      <SeeEmployeeBody>
        <LeftMenu />
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
          <CurrEmployeeContent>
            <Container>
              <EmployeeProfile />
              <UpdateEmployee />
            </Container>

            <EmployeeAllowance />
          </CurrEmployeeContent>
        </MainContainer>
      </SeeEmployeeBody>
    </SeeEmployeeContainer>
  );
};
