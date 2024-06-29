/* eslint-disable react-hooks/exhaustive-deps */
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Header } from "../../sections/header/header";
import {
  BackButton,
  CurrEmployeeContent,
  SeeEmployeeContainer,
  SeeEmployeeHeader,
  Title,
  TitleContainer,
} from "../see-employee/see-employee.style";
import { Item, UserProfileContainer } from "./user-profile.style";

import { FaRegUserCircle } from "react-icons/fa";
import { IconContainer } from "../../sections/profile/profile.style";
import { useNavigate } from "react-router-dom";
import UserOvertime from "./user-overtime";
import UserDeductions from "./user-deductions";
import UserAllowance from "./user-allowance";
import { useAuth } from "../../../contexts/auth-context";
import { useContext, useEffect } from "react";
import { DisplayContext } from "../../../contexts/display-context";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { NavigationBar } from "../../utils/nav-bar/nav-bar";
import { EmployeeProfile } from "../../utils/profile/employee-profile";

const UserProfile = () => {
  const navigate = useNavigate();
  const { curr_user: employee } = useAuth();
  const { display, setDisplay } = useContext(DisplayContext);
  const dispatcher = useAppDispatch();

  useEffect(() => {
    dispatcher(getCurrEmpPaymentInfo(employee.id));
    setDisplay({
      ...display,
      list_employees: false,
      see_employee_allowance: true,
      see_employee_deduction: false,
      see_employee_overtime: false,
    });
  }, [employee.id]);
  return (
    <>
      <Header />
      <UserProfileContainer>
        <SeeEmployeeContainer>
          <SeeEmployeeHeader>
            <TitleContainer>
              <BackButton
                onClick={() => {
                  navigate("/home-page");
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
          </SeeEmployeeHeader>
          <CurrEmployeeContent>
            <EmployeeProfile />
            {display.see_employee_allowance && <UserAllowance />}
            {display.see_employee_overtime && <UserOvertime />}
            {display.see_employee_deduction && <UserDeductions />}
          </CurrEmployeeContent>
        </SeeEmployeeContainer>
      </UserProfileContainer>
    </>
  );
};

export default UserProfile;
