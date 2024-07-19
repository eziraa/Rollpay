import { AddBtn } from "../../../sections/add_employee/add-employee.style";
import {
  ActionContainer,
  AddItemContainer,
  AddItemForm,
  AddItemInput,
  AddItemTitle,
  InputContainer,
  AddItemLabel,
  DataLabel,
  ItemTitle,
  RowTamplate,
  CheckBox,
} from "../utils/add-item/add-item.style";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useEffect, useState } from "react";
import {
  editUserRequest,
  getRolesRequest,
} from "../../../../store/admin/admin-slice";
import { FormError } from "../../../utils/form-elements/form.style";
import { ErrorMessage } from "../../sign-up/sign-up.style";
import { useParams } from "react-router";
import { Option, Select } from "../utils/dropdown/dropdown.style";
export interface EditableUser {
  id: string;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  password: string;
  empID: string;
  is_staff: boolean;
  is_superuser: boolean;
}
export const EditUser = () => {
  const dispatcher = useAppDispatch();
  const { user_id } = useParams();
  const { adding, task_error, users, roles } = useAdmin();
  const [inputError, setInputError] = useState(false);
  const [currentUser, setCurrentUser] = useState<EditableUser>({
    id: "",
    username: "",
    email: "",
    role: "",
    first_name: "",
    last_name: "",
    password: "",
    empID: "",
    is_staff: false,
    is_superuser: false,
  });

  useEffect(() => {
    const user = users.find((user) => user.id == user_id);
    user &&
      setCurrentUser({
        ...user,
        role: user.role.name,
      });
    dispatcher(getRolesRequest());
  }, []);

  const validate = (user: EditableUser): boolean => {
    return Object.values(user).some((value) => value === "");
  };

  return (
    <AddItemContainer>
      <AddItemTitle>Add User </AddItemTitle>
      <AddItemForm
        style={{
          width: "100%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setInputError(validate(currentUser));

          !inputError && !adding && dispatcher(editUserRequest(currentUser));
        }}
      >
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="username">Username: </AddItemLabel>
          <AddItemInput
            type="text"
            name="username"
            value={currentUser.username}
            onChange={(e) => {
              setCurrentUser({
                ...currentUser,
                username: e.target.value,
              });
            }}
          />
          {currentUser.username === "" && inputError && (
            <ErrorMessage>Username required</ErrorMessage>
          )}
        </InputContainer>

        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="id">User ID: </AddItemLabel>
          <AddItemInput type="text" disabled name="id" value={currentUser.id} />
          {currentUser.id === "" && inputError && (
            <ErrorMessage>User required</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 3fr",
          }}
        >
          <AddItemLabel htmlFor="password">Password: </AddItemLabel>
          <AddItemLabel htmlFor="password">{currentUser.password}</AddItemLabel>
        </InputContainer>
        <DataLabel>
          <ItemTitle>Personal Information</ItemTitle>
        </DataLabel>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="empID">Employee ID </AddItemLabel>
          <AddItemInput
            type="text"
            name="empID"
            value={currentUser.empID}
            onChange={(e) => {
              setCurrentUser({
                ...currentUser,
                [`${e.target.name}`]: e.target.value,
              });
            }}
          />
          {currentUser.empID === "" && inputError && (
            <ErrorMessage> Employee Id Required </ErrorMessage>
          )}
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="first_name">First Name </AddItemLabel>
          <AddItemInput
            type="text"
            name="first_name"
            value={currentUser.first_name}
            onChange={(e) => {
              setCurrentUser({
                ...currentUser,
                first_name: e.target.value,
              });
            }}
          />
          {currentUser.first_name === "" && inputError && (
            <ErrorMessage> Employee first name not provided</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="empID">Last Name </AddItemLabel>
          <AddItemInput
            type="text"
            name="last_name"
            value={currentUser.last_name}
            onChange={(e) => {
              setCurrentUser({
                ...currentUser,
                last_name: e.target.value,
              });
            }}
          />
          {currentUser.last_name === "" && inputError && (
            <ErrorMessage> Employee name Not provided </ErrorMessage>
          )}
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="empID">Email </AddItemLabel>
          <AddItemInput
            type="text"
            name="email"
            value={currentUser.email}
            onChange={(e) => {
              setCurrentUser({
                ...currentUser,
                email: e.target.value,
              });
            }}
          />
          {currentUser.email === "" && inputError && (
            <ErrorMessage> Email not Povided </ErrorMessage>
          )}
        </InputContainer>
        <DataLabel>
          <ItemTitle>Authorization</ItemTitle>
        </DataLabel>
        <InputContainer>
          <RowTamplate>
            <CheckBox
              type="checkbox"
              checked={currentUser.is_staff}
              onChange={(e) => {
                setCurrentUser({
                  ...currentUser,
                  is_staff: e.target.checked,
                });
              }}
            />
            <AddItemLabel
              style={{
                display: "block",
              }}
            >
              Staff status
            </AddItemLabel>
          </RowTamplate>
        </InputContainer>
        <InputContainer>
          <RowTamplate>
            <CheckBox
              type="checkbox"
              checked={currentUser.is_superuser}
              onChange={(e) => {
                setCurrentUser({
                  ...currentUser,
                  [`${e.target.name}`]: e.target.checked,
                });
              }}
            />
            <AddItemLabel> Super User status</AddItemLabel>
          </RowTamplate>
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="empID">Role </AddItemLabel>
          <Select
            defaultValue={currentUser.role}
            onChange={(e) => {
              setCurrentUser({
                ...currentUser,
                role: e.target.value,
              });
            }}
          >
            {roles.map((role) => (
              <Option value={role.id}>{role.name}</Option>
            ))}
          </Select>
          {currentUser.role === "" && inputError && (
            <ErrorMessage>Role is not selectd </ErrorMessage>
          )}
        </InputContainer>
        {task_error && <ErrorMessage>{task_error}</ErrorMessage>}
        <ActionContainer>
          <AddBtn type="submit">Save</AddBtn>
          {task_error && <FormError> {task_error} </FormError>}
        </ActionContainer>
      </AddItemForm>
    </AddItemContainer>
  );
};
