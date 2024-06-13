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
              <DataValue>Ezira Tigab</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Gender</DataLabel>
              <DataValue>M</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Email</DataLabel>
              <DataValue>ezra@gmail.com</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Phone Number</DataLabel>
              <DataValue>+25184577258</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Role</DataLabel>
              <DataValue>Back End Developer</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Birth Date</DataLabel>
              <DataValue>23-23-23</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Date of Hire</DataLabel>
              <DataValue>09-12-23</DataValue>
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
              value="Ezira"
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
              value=" Tigab"
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
              value=" M"
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
              value=" ezra@gmail.com"
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
              value=" +25184577258"
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
              value="Back End Developer"
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
              value="09-02-24"
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
              value="09-23-19"
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
