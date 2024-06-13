/* eslint-disable react-hooks/rules-of-hooks */
import { MutableRefObject, useRef, useState } from "react";
import { Input } from "../../utils/form-elements/form.style";
import {
  ActionBtn,
  ActionBtnsContainer,
  CancelButton,
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
import { MdOutlineAdd, MdOutlineEdit } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { setLongTask } from "../../../store/user/user-slice";
import { LIST_EMP_S } from "../../../constants/tasks";

interface InputInterface {
  value: string;
  change: (value: string) => void;
  disabled: boolean;
  ref: MutableRefObject<HTMLInputElement | null>;
}
interface EditInput {
  first_name: InputInterface;
  last_name: InputInterface;
  phone_number: InputInterface;
  email: InputInterface;
  position: InputInterface;
  date_of_birth: InputInterface;
  date_of_hire: InputInterface;
  gender: InputInterface;
}

const getInputInstance = (name: string): InputInterface => {
  const [value, change] = useState(name);
  const disabled = true;
  const ref = useRef<HTMLInputElement | null>(null);
  return { value, change, disabled, ref };
};
export const EditEmployee = () => {
  const { curr_emp: current_employee } = useAppSelector(
    (state) => state.employee
  );
  const dsipatcher = useAppDispatch();
  const [editObject, updateEditObject] = useState<EditInput>({
    first_name: getInputInstance(current_employee?.first_name || "No Name"),
    last_name: getInputInstance(current_employee?.last_name || "No Name"),
    phone_number: getInputInstance(
      current_employee?.phone_number || "No Phone Number"
    ),
    email: getInputInstance(current_employee?.email || "No Email"),
    position: getInputInstance(current_employee?.position || "No Position"),
    date_of_birth: getInputInstance(
      current_employee?.date_of_birth || "No Date of Birth"
    ),
    date_of_hire: getInputInstance(
      current_employee?.date_of_hire || "No Date of Hire"
    ),
    gender: getInputInstance(current_employee?.gender || "No Gender"),
  });
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
            dsipatcher(setLongTask(LIST_EMP_S));
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
              value={editObject.first_name.value}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  first_name: {
                    ...editObject.first_name,
                    value: e.target.value,
                  },
                });
              }}
              style={{
                flex: "1",
              }}
              disabled={editObject.first_name.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  first_name: {
                    ...editObject.first_name,
                    disabled: !editObject.first_name.disabled,
                  },
                });
              }}
            >
              {editObject.first_name.disabled ? (
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
              value={editObject.last_name.value}
              style={{
                flex: "1",
              }}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  last_name: {
                    ...editObject.last_name,
                    value: e.target.value,
                  },
                });
              }}
              disabled={editObject.last_name.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  last_name: {
                    ...editObject.last_name,
                    disabled: !editObject.last_name.disabled,
                  },
                });
              }}
            >
              {editObject.last_name.disabled ? (
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
              value={editObject.gender.value}
              style={{
                flex: "1",
              }}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  gender: {
                    ...editObject.gender,
                    value: e.target.value,
                  },
                });
              }}
              disabled={editObject.gender.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  gender: {
                    ...editObject.gender,
                    disabled: !editObject.gender.disabled,
                  },
                });
              }}
            >
              {editObject.gender.disabled ? (
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
              value={editObject.email.value}
              style={{
                flex: "1",
              }}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  gender: {
                    ...editObject.gender,
                    value: e.target.value,
                  },
                });
              }}
              disabled={editObject.email.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  email: {
                    ...editObject.email,
                    disabled: !editObject.email.disabled,
                  },
                });
              }}
            >
              {editObject.email.disabled ? (
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
              value={editObject?.phone_number.value}
              style={{
                flex: "1",
              }}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  phone_number: {
                    ...editObject.phone_number,
                    value: e.target.value,
                  },
                });
              }}
              disabled={editObject.phone_number.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  phone_number: {
                    ...editObject.phone_number,
                    disabled: !editObject.phone_number.disabled,
                  },
                });
              }}
            >
              {editObject.phone_number.disabled ? (
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
              value={editObject.position.value}
              style={{
                flex: "1",
              }}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  position: {
                    ...editObject.position,
                    value: e.target.value,
                  },
                });
              }}
              disabled={editObject.position.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  position: {
                    ...editObject.position,
                    disabled: !editObject.position.disabled,
                  },
                });
              }}
            >
              {editObject.position.disabled ? (
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
              type="date"
              name="date_of_birth"
              required
              value={editObject.date_of_birth.value}
              style={{
                flex: "1",
              }}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  date_of_birth: {
                    ...editObject.date_of_birth,
                    value: e.target.value,
                  },
                });
              }}
              disabled={editObject.date_of_birth.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  date_of_birth: {
                    ...editObject.date_of_birth,
                    disabled: !editObject.date_of_birth.disabled,
                  },
                });
              }}
            >
              {editObject.date_of_birth.disabled ? (
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
              type="date"
              name="date_of_fire"
              required
              value={editObject?.date_of_hire.value}
              style={{
                flex: "1",
              }}
              onChange={(e) => {
                updateEditObject({
                  ...editObject,
                  date_of_hire: {
                    ...editObject.date_of_hire,
                    value: e.target.value,
                  },
                });
              }}
              disabled={editObject.date_of_hire.disabled}
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                updateEditObject({
                  ...editObject,
                  date_of_hire: {
                    ...editObject.date_of_hire,
                    disabled: !editObject.date_of_hire.disabled,
                  },
                });
              }}
            >
              {editObject.date_of_hire.disabled ? (
                <MdOutlineEdit />
              ) : (
                <SaveButton>Save</SaveButton>
              )}
            </EditButton>
          </EmployeeData>
          <ActionBtnsContainer>
            <ActionBtn>
              <MdOutlineAdd /> Add Allowance
            </ActionBtn>
            <ActionBtn>
              <MdOutlineAdd />
              Add Deducation
            </ActionBtn>
            <ActionBtn>
              <MdOutlineAdd />
              Add Overtime
            </ActionBtn>
          </ActionBtnsContainer>
        </EditEmployeeBody>
      </EditEmployeeContent>
    </EditEmployeeContainer>
  );
};
