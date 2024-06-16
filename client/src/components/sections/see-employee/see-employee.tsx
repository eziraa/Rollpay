/* eslint-disable react-hooks/rules-of-hooks */

import {
  Button,
  BackButton,
  DataLabel,
  DataValue,
  SeeEmployeeContainer,
  EditEmployeeContent,
  EmployeeData,
  EmployeeInfoContainer,
  EmployeeeProfileContainer,
  NavBar,
  NavItem,
  ProfileImage,
  Title,
  SeeEmployeeHeader,
  TitleContainer,
} from "./see-employee.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { setLongTask } from "../../../store/user/user-slice";
import {
  EDIT_EMP,
  LIST_EMP_S,
  SEE_EMP_ALLOWANCE,
} from "../../../constants/tasks";
import { MdModeEditOutline } from "react-icons/md";
import { EmployeeAllowance } from "../allowance/allowance";
import {
  resetCurrEmployee,
  setMajorTask,
} from "../../../store/employee/employee-slice";
import { EditEmployee } from "../edit-employee/edit-employee";

export const SeeEmployee = () => {
  const { curr_emp: current_employee } = useAppSelector(
    (state) => state.employee
  );

  const { major_task } = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();

  return (
    <SeeEmployeeContainer>
      <SeeEmployeeHeader>
        <TitleContainer>
          <BackButton
            onClick={() => {
              dispatcher(setLongTask(LIST_EMP_S));
              dispatcher(resetCurrEmployee());
            }}
          >
            <IoChevronBackCircleOutline />
          </BackButton>
          <Title>Edit Employee</Title>
        </TitleContainer>
        <NavBar>
          <NavItem>Allowances</NavItem>
          <NavItem>overtimes</NavItem>
          <NavItem>Deducstion</NavItem>
        </NavBar>
      </SeeEmployeeHeader>
      <EditEmployeeContent>
        <EmployeeeProfileContainer>
          <ProfileImage />
          <EmployeeInfoContainer>
            <EmployeeData>
              <DataLabel>Full Name</DataLabel>
              <DataValue>
                {current_employee?.first_name +
                  " " +
                  current_employee?.last_name}
              </DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Gender</DataLabel>
              <DataValue>{current_employee?.gender}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Email</DataLabel>
              <DataValue>{current_employee?.email}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Phone Number</DataLabel>
              <DataValue>{current_employee?.phone_number}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Role</DataLabel>
              <DataValue>{current_employee?.position}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Salary</DataLabel>
              <DataValue>{current_employee?.salary}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Birth Date</DataLabel>
              <DataValue>{current_employee?.date_of_birth}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Date of Hire</DataLabel>
              <DataValue>{current_employee?.date_of_hire}</DataValue>
            </EmployeeData>
          </EmployeeInfoContainer>
          {major_task !== EDIT_EMP && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatcher(setMajorTask(EDIT_EMP));
              }}
            >
              <MdModeEditOutline /> Edit
            </Button>
          )}
        </EmployeeeProfileContainer>
        {major_task == EDIT_EMP && <EditEmployee />}
        {major_task == SEE_EMP_ALLOWANCE && <EmployeeAllowance />}
      </EditEmployeeContent>
    </SeeEmployeeContainer>
  );
};
