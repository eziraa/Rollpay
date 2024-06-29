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

export const SeeEmployee = () => {
  return (
    <MainContainer>
      <SeeEmployeeHeader>
        <TitleContainer>
          <Title>Current Employee</Title>
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
