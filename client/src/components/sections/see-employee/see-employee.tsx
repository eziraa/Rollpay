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
  ActionBtnsContainer,
  DeleteButton,
} from "./see-employee.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";
// import {
//   EDIT_EMP,
//   LIST_EMP_S,
//   SEE_EMP_ALLOWANCE,
//   SEE_EMP_DEDUCTION,
//   SEE_EMP_OVERTIME,
// } from "../../../constants/tasks";
import { MdModeEditOutline } from "react-icons/md";
import { EmployeeAllowance } from "../allowance/allowance";
import {
  resetCurrEmployee,
  tryingToDelete,
} from "../../../store/employee/employee-slice";
import { EditEmployee } from "../edit-employee/edit-employee";
import { EmployeeOvertime } from "../overtime/overtime";
import { EmployeeDeduction } from "../deduction/deduction";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext } from "react";
import { DisplayContext } from "../../../contexts/display-context";

export const SeeEmployee = () => {
  const { curr_emp: current_employee } = useAppSelector(
    (state) => state.employee
  );
  const { display, setDisplay } = useContext(DisplayContext);
  const dispatcher = useAppDispatch();

  return (
    <SeeEmployeeContainer>
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
        <NavBar>
          <NavItem
            active={display.see_employee_allowance}
            onClick={(e) => {
              e.preventDefault();
              setDisplay({
                ...display,
                see_employee_allowance: true,
                see_employee_overtime: false,
                see_employee_deduction: false,
                edit_employee: false,
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
                see_employee_overtime: true,
                see_employee_allowance: false,
                see_employee_deduction: false,
                edit_employee: false,
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
                see_employee_deduction: true,
                see_employee_allowance: false,
                see_employee_overtime: false,
                edit_employee: false,
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
          <ActionBtnsContainer
            style={{
              gap: "2rem",
            }}
          >
            <DeleteButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatcher(tryingToDelete());
              }}
            >
              <RiDeleteBin6Line /> Delete
            </DeleteButton>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDisplay({
                  ...display,
                  edit_employee: true,
                  list_employees: false,
                  see_employee_allowance: false,
                  see_employee_deduction: false,
                  see_employee_overtime: false,
                });
                // dispatcher(setMajorTask(EDIT_EMP));
              }}
              disabled={display.edit_employee}
              style={{
                cursor: display.edit_employee ? "not-allowed" : "pointer",
              }}
            >
              <MdModeEditOutline /> Edit
            </Button>
          </ActionBtnsContainer>
        </EmployeeeProfileContainer>
        {display.edit_employee && <EditEmployee />}
        {display.see_employee_allowance && <EmployeeAllowance />}
        {display.see_employee_overtime && <EmployeeOvertime />}
        {display.see_employee_deduction && <EmployeeDeduction />}
      </EditEmployeeContent>
    </SeeEmployeeContainer>
  );
};
