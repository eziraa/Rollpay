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

const UserProfile = () => {
  const navigate = useNavigate();
  const { employee_id } = useParams();
  const dispatcher = useAppDispatch();
  const employee = useSalary().curr_emp?.employee;

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
      </UserProfileHeader>
      <UserProfileContent>
        {employee && <EmployeeProfile employee={employee} />}
        <Outlet />
      </UserProfileContent>
    </UserProfileBody>
  );
};

export default UserProfile;
