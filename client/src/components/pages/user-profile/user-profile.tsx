import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Header } from "../../sections/header/header";
import {
  ActionBtnsContainer,
  BackButton,
  DataLabel,
  DataValue,
  EditEmployeeContent,
  EmployeeData,
  EmployeeeProfileContainer,
  EmployeeInfoContainer,
  NavBar,
  NavItem,
  ProfileImage,
  SeeEmployeeContainer,
  SeeEmployeeHeader,
  Title,
  TitleContainer,
} from "../../sections/see-employee/see-employee.style";
import { Item, UserProfileContainer } from "./user-profile.style";

// import { useAppDispatch } from "../../../utils/custom-hook";
// import { setMajorTask } from "../../../store/employee/employee-slice";
// import {
//   SEE_EMP_ALLOWANCE,
//   SEE_EMP_DEDUCTION,
//   SEE_EMP_OVERTIME,
// } from "../../../constants/tasks";

import { FaRegUserCircle } from "react-icons/fa";
import { IconContainer } from "../../sections/profile/profile.style";
import { useNavigate } from "react-router-dom";
import UserOvertime from "./user-overtime";
import UserDeductions from "./user-deductions";
import UserAllowance from "./user-allowance";
import { useAuth } from "../../../contexts/auth-context";
import { useContext } from "react";
import { DisplayContext } from "../../../contexts/display-context";

const UserProfile = () => {
  const navigate = useNavigate();
  const { curr_user: employee } = useAuth();
  const { display, setDisplay } = useContext(DisplayContext);
  // const { major_task } = useAppSelector((state) => state.employee);
  // const dispatcher = useAppDispatch();
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
            <NavBar>
              <NavItem
                active={display.see_employee_allowance}
                onClick={(e) => {
                  e.preventDefault();
                  setDisplay({
                    ...display,
                    see_employee_allowance: true,
                    see_employee_deduction: false,
                    see_employee_overtime: false,
                  });
                }}
              >
                Allowances
              </NavItem>
              <NavItem
                active={display.see_employee_overtime}
                onClick={(e) => {
                  e.preventDefault();
                  setDisplay({
                    ...display,
                    see_employee_allowance: false,
                    see_employee_deduction: false,
                    see_employee_overtime: true,
                  });
                }}
              >
                Overtimes
              </NavItem>
              <NavItem
                active={display.see_employee_deduction}
                onClick={(e) => {
                  e.preventDefault();
                  setDisplay({
                    ...display,
                    see_employee_allowance: false,
                    see_employee_deduction: true,
                    see_employee_overtime: false,
                  });
                }}
              >
                Deductions
              </NavItem>
            </NavBar>
          </SeeEmployeeHeader>
          <EditEmployeeContent>
            <EmployeeeProfileContainer>
              <ProfileImage />
              <EmployeeInfoContainer>
                <EmployeeData>
                  <DataLabel>Full Name</DataLabel>
                  <DataValue>
                    {employee?.first_name + " " + employee?.last_name}
                  </DataValue>
                </EmployeeData>
                <EmployeeData>
                  <DataLabel>Gender</DataLabel>
                  <DataValue>{employee?.gender}</DataValue>
                </EmployeeData>
                <EmployeeData>
                  <DataLabel>Email</DataLabel>
                  <DataValue>{employee?.email}</DataValue>
                </EmployeeData>
                <EmployeeData>
                  <DataLabel>Phone Number</DataLabel>
                  <DataValue>{employee?.phone_number}</DataValue>
                </EmployeeData>
                <EmployeeData>
                  <DataLabel>Role</DataLabel>
                  <DataValue>{employee?.position}</DataValue>
                </EmployeeData>
                <EmployeeData>
                  <DataLabel>Salary</DataLabel>
                  <DataValue>{employee?.salary}</DataValue>
                </EmployeeData>
                <EmployeeData>
                  <DataLabel>Birth Date</DataLabel>
                  <DataValue>{employee?.date_of_birth}</DataValue>
                </EmployeeData>
                <EmployeeData>
                  <DataLabel>Date of Hire</DataLabel>
                  <DataValue>{employee?.date_of_hire}</DataValue>
                </EmployeeData>
              </EmployeeInfoContainer>
              <ActionBtnsContainer
                style={{
                  gap: "2rem",
                }}
              ></ActionBtnsContainer>
            </EmployeeeProfileContainer>
            {display.see_employee_allowance && <UserAllowance />}
            {display.see_employee_overtime && <UserOvertime />}
            {display.see_employee_deduction && <UserDeductions />}
          </EditEmployeeContent>
        </SeeEmployeeContainer>
      </UserProfileContainer>
    </>
  );
};

export default UserProfile;
