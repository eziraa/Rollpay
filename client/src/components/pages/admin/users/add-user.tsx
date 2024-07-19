import { AddBtn } from "../../../sections/add_employee/add-employee.style";
import {
  ActionContainer,
  AddItemContainer,
  AddItemForm,
  AddItemInput,
  AddItemTitle,
  InputContainer,
  AddItemLabel,
} from "../utils/add-item/add-item.style";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useEffect, useState } from "react";
import {
  addGroupRequest,
  addUserRequest,
  editGroupRequest,
  getPermissionsRequest,
} from "../../../../store/admin/admin-slice";
import { Permission } from "../../../../typo/admin/response";
import {
  FormError,
  PasswordContainer,
} from "../../../utils/form-elements/form.style";
import { useParams } from "react-router";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../../schema/sign-up-schema";
import { ACCESS_TOKEN } from "../../../../constants/token-constants";
import { signUpRequested } from "../../../../store/user/user-slice";
import { ErrorMessage } from "../../sign-up/sign-up.style";
import { PasswordVisible } from "../../../utils/password-visiblity/password.style";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

export const AddUser = () => {
  const dispatcher = useAppDispatch();
  const { permissions, task_error, groups, adding } = useAdmin();
  const [selectedOptions, setSelectedOptions] = useState<Permission[]>([]);
  const [name, setName] = useState("");
  const { group_id } = useParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password_C_Visible, setPassword_C_Visible] = useState<boolean>(false);

  const togglePassword_C_Visiblity = () => {
    setPassword_C_Visible(!password_C_Visible);
  };
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const permission = {
    all_permissions: permissions,
    selected_permissions: selectedOptions,
    selectHandler: setSelectedOptions,
  };
  const group = groups.find((g) => g.id == group_id);
  useEffect(() => {
    if (group_id && group) {
      setName(group.name);
      setSelectedOptions(group.permissions);
    }
    // Fetch permissions on component mount or group_id change
  }, [group_id]);
  useEffect(() => {
    dispatcher(getPermissionsRequest());
  }, []);
  const initialValues = {
    username: "",
    empID: "",
    password: "",
    confirmPassword: "",
  };
  const { touched, values, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        if (!adding) {
          localStorage.removeItem(ACCESS_TOKEN);
          dispatcher(addUserRequest(values));
        }
      },
    });
  return (
    <AddItemContainer>
      <AddItemTitle>Add User </AddItemTitle>
      <AddItemForm
        style={{
          width: "100%",
        }}
        onSubmit={handleSubmit}
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
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.username && errors.username && (
            <ErrorMessage>{errors.username} </ErrorMessage>
          )}
        </InputContainer>

        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="empID">Employee ID: </AddItemLabel>
          <AddItemInput
            type="text"
            name="empID"
            value={values.empID}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.empID && errors.empID && (
            <ErrorMessage>{errors.empID} </ErrorMessage>
          )}
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="password">Password: </AddItemLabel>
          <PasswordContainer>
            <PasswordVisible onClick={togglePasswordVisiblity}>
              {passwordVisible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </PasswordVisible>

            <AddItemInput
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </PasswordContainer>

          {touched.password && errors.password && (
            <ErrorMessage>{errors.password}</ErrorMessage>
          )}
        </InputContainer>

        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="confirmPassword">
            Confirm Password:{" "}
          </AddItemLabel>
          <PasswordContainer>
            <PasswordVisible onClick={togglePassword_C_Visiblity}>
              {password_C_Visible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </PasswordVisible>

            <input
              type={password_C_Visible ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </PasswordContainer>

          {touched.confirmPassword && errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword} </ErrorMessage>
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
