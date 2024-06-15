/* eslint-disable react-hooks/rules-of-hooks */

import {
  Button,
  CancelButton,
  DataLabel,
  DataValue,
  EditEmployeeContainer,
  EditEmployeeContent,
  EmployeeData,
  EmployeeInfoContainer,
  EmployeeeProfileContainer,
  ProfileImage,
  Title,
} from "./see-employee.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { setLongTask } from "../../../store/user/user-slice";
import { EDIT_EMP, LIST_EMP_S } from "../../../constants/tasks";
import { EditEmployee } from "../edit-employee/edit-employee";

// Now, valuesOnlyObject contains only the values from editObject

export const SeeEmployee = () => {
  const { curr_emp: current_employee } = useAppSelector(
    (state) => state.employee
  );

  const { long_task } = useAppSelector((state) => state.user);
  const dispatcher = useAppDispatch();

  return (
    <EditEmployeeContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <CancelButton
          onClick={() => {
            dispatcher(setLongTask(LIST_EMP_S));
          }}
        >
          <IoReturnUpBackSharp />
        </CancelButton>
        <Title>Edit Employee</Title>
      </div>
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
          {long_task !== EDIT_EMP && <Button>Edit</Button>}
        </EmployeeeProfileContainer>
        <EditEmployee />
      </EditEmployeeContent>
    </EditEmployeeContainer>
  );
};
