/* eslint-disable react-hooks/rules-of-hooks */

import {
  BackButton,
  EditEmployeeContent,
  Title,
  SeeEmployeeHeader,
  TitleContainer,
  SeeEmployeeBody,
  SeeEmployeeContainer,
} from "./see-employee.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { EmployeeAllowance } from "../../sections/employee-allowance/allowance";
import { resetCurrEmployee } from "../../../store/employee/employee-slice";
import { useContext, useEffect } from "react";
import { DisplayContext } from "../../../contexts/display-context";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import LeftMenu from "../../sections/left-menu/left-menu";
import { Header } from "../../sections/header/header";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { EmployeeProfile } from "../../utils/profile/employee-profile";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import { SEE_EMPLOYEE, SEE_EMP_ALLOWANCE } from "../../../constants/tasks";

export const SeeEmployee = () => {
  const { display, setDisplay } = useContext(DisplayContext);
  const dispatcher = useAppDispatch();
  useEffect(() => {
    const curr_emp_id = localStorage.getItem("curr_emp_id");
    curr_emp_id && dispatcher(getCurrEmpPaymentInfo(curr_emp_id));
  }, []);
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
                  setDisplay({
                    ...display,
                    see_employee: false,
                    list_employees: true,
                  });
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
            <EmployeeProfile />
            <EmployeeAllowance />
          </EditEmployeeContent>
        </MainContainer>
      </SeeEmployeeBody>
    </SeeEmployeeContainer>
  );
};
