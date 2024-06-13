import { useState } from "react";
import { Input } from "../../utils/form-elements/form.style";
import {
  DataLabel,
  DataValue,
  EditButton,
  EditEmployeeBody,
  EditEmployeeContainer,
  EditEmployeeContent,
  EmployeeData,
  EmployeeInfoContainer,
  EmployeeeProfileContainer,
  ProfileImage,
  SaveButton,
  Title,
} from "./edit-employee.style";
import { MdOutlineEdit } from "react-icons/md";
import { useAppSelector } from "../../../utils/custom-hook";

interface InputFieldDisability {
  first_name: boolean;
  last_name: boolean;
  phone_number: boolean;
  email: boolean;
  position: boolean;
  date_of_birth: boolean;
  date_of_hire: boolean;
  gender: boolean;
}
export const EditEmployee = () => {
  const { curr_emp: current_employee } = useAppSelector(
    (state) => state.employee
  );
  const [inputFieldDisability, setInputFieldDisability] =
    useState<InputFieldDisability>({
      first_name: true,
      last_name: true,
      phone_number: true,
      email: true,
      position: true,
      date_of_birth: true,
      date_of_hire: true,
      gender: true,
    });
  return (
    <EditEmployeeContainer>
      <Title>Edit Employee</Title>
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
              <DataLabel>Birth Date</DataLabel>
              <DataValue>{current_employee?.date_of_birth}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Date of Hire</DataLabel>
              <DataValue>{current_employee?.date_of_hire}</DataValue>
            </EmployeeData>
          </EmployeeInfoContainer>
        </EmployeeeProfileContainer>
        <EditEmployeeBody>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>First Name</DataLabel>
            <Input
              type="text"
              name="first_name"
              required
              value={current_employee?.first_name}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.first_name}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  first_name: !inputFieldDisability.first_name,
                });
              }}
            >
              {inputFieldDisability.first_name ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>Last Name</DataLabel>
            <Input
              type="text"
              name="last_name"
              required
              value={current_employee?.last_name}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.last_name}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  last_name: !inputFieldDisability.last_name,
                });
              }}
            >
              {inputFieldDisability.last_name ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>Gender</DataLabel>
            <Input
              type="text"
              name="gender"
              required
              value={current_employee?.gender}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.gender}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  gender: !inputFieldDisability.gender,
                });
              }}
            >
              {inputFieldDisability.gender ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>Email</DataLabel>
            <Input
              type="text"
              name="email"
              required
              value={current_employee?.email}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.email}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  email: !inputFieldDisability.email,
                });
              }}
            >
              {inputFieldDisability.email ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>Phone Number</DataLabel>
            <Input
              type="text"
              name="phone_number"
              required
              value={current_employee?.phone_number}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.phone_number}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  phone_number: !inputFieldDisability.phone_number,
                });
              }}
            >
              {inputFieldDisability.phone_number ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>Role</DataLabel>
            <Input
              type="text"
              name="position"
              required
              value={current_employee?.position}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.position}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  position: !inputFieldDisability.position,
                });
              }}
            >
              {inputFieldDisability.position ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>Birth Date</DataLabel>
            <Input
              type="text"
              name="date_of_birth"
              required
              value={current_employee?.date_of_birth}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.date_of_birth}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  date_of_birth: !inputFieldDisability.date_of_birth,
                });
              }}
            >
              {inputFieldDisability.date_of_birth ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <EmployeeData
            style={{
              gap: "3rem",
            }}
          >
            <DataLabel>Date of Hire</DataLabel>
            <Input
              type="text"
              name="date_of_fire"
              required
              value={current_employee?.date_of_hire}
              style={{
                flex: "1",
              }}
              disabled={inputFieldDisability.date_of_hire}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                setInputFieldDisability({
                  ...inputFieldDisability,
                  date_of_hire: !inputFieldDisability.date_of_hire,
                });
              }}
            >
              {inputFieldDisability.date_of_hire ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
        </EditEmployeeBody>
      </EditEmployeeContent>
    </EditEmployeeContainer>
  );
};
