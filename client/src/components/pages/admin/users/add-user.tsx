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
  addUserRequest,
  resetError,
} from "../../../../store/admin/admin-slice";
import {
  FormError,
  PasswordContainer,
} from "../../../utils/form-elements/form.style";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../../schema/sign-up-schema";
import { ErrorMessage } from "../../sign-up/sign-up.style";
import { PasswordVisible } from "../../../utils/password-visiblity/password.style";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

export const AddUser = () => {
  const dispatcher = useAppDispatch();
  const { adding, task_error } = useAdmin();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password_C_Visible, setPassword_C_Visible] = useState<boolean>(false);

  const togglePassword_C_Visiblity = () => {
    setPassword_C_Visible(!password_C_Visible);
  };
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };

  const initialValues = {
    username: "",
    empID: "",
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
    dispatcher(resetError());
  }, [initialValues.username, initialValues.empID]);
  const { touched, values, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        if (!adding) {
          dispatcher(addUserRequest(values));
        }
      },
    });
  return (
    <AddItemContainer className="drop-shadow-md">
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
        <ActionContainer>
          {adding ? (
            <CircularProgress size={20} />
          ) : (
            <AddBtn type="submit">Save</AddBtn>
          )}
          {task_error && <FormError> {task_error} </FormError>}
        </ActionContainer>
      </AddItemForm>
    </AddItemContainer>
  );
};
