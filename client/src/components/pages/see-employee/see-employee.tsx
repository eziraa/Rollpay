/* eslint-disable react-hooks/rules-of-hooks */

import {
  BackButton,
  CurrEmployeeContent,
  Title,
  SeeEmployeeHeader,
  TitleContainer,
} from "./see-employee.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { resetCurrEmployee } from "../../../store/employee/employee-slice";
import { MainContainer } from "../../utils/pages-utils/containers.style";

import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import { Outlet } from "react-router-dom";

export const SeeEmployee = () => {
  const dispatcher = useAppDispatch();
  return (
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
        <EmployeeProfile />
        <Outlet />
      </CurrEmployeeContent>
    </MainContainer>
  );
};
