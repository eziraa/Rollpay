import { SignUpContainer, ErrorMessage, LogInLink } from "./sign-up.style";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../schema/sign-up-schema";
import { FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { SignUpPage } from "./sign-up.style";
import {
  Button,
  Form,
  Input,
  InputContainer,
  Label,
  Title,
  PasswordContainer,
} from "../../utils/form-elements/form.style";
import { PasswordVisible } from "../../utils/password-visiblity/password.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { reset, signUpRequested } from "../../../store/user/user-slice";
import { CustomLink, Text } from "../login/login.style";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../../constants/token-constants";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";

const SignUp = () => {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const initialValues = {
    username: "",
    empID: "",
    password: "",
    confirmPassword: "",
  };
  const {
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      if (!user.creating) {
        localStorage.removeItem(ACCESS_TOKEN);
        dispatcher(signUpRequested(values));
      }
    },
  });
  useEffect(() => {
    if (user.acc_created) {
      dispatcher(
        setFlashMessage({
          desc: "We sent email,please check and confirm.",
          type: "success",
          duration: 3,
          status: true,
          title: "Account Creation",
        })
      );
      dispatcher(reset());
      resetForm();
    }
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password_C_Visible, setPassword_C_Visible] = useState<boolean>(false);

  const togglePassword_C_Visiblity = () => {
    setPassword_C_Visible(!password_C_Visible);
  };
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <SignUpPage>
      <SignUpContainer className="container shadow-lg">
        <Title>Sign up</Title>
        <Form onSubmit={handleSubmit}>
          <div className="flex space-x-2 w-full">
            <InputContainer className="felx-1">
              <Label htmlFor="username">Username: </Label>
              <Input
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

            <InputContainer className="flex-1">
              <Label htmlFor="empID">Employee ID: </Label>
              <Input
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
          </div>
          <InputContainer>
            <Label htmlFor="password">Password: </Label>
            <PasswordContainer>
              <PasswordVisible onClick={togglePasswordVisiblity}>
                {passwordVisible ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </PasswordVisible>

              <input
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

          <InputContainer>
            <Label htmlFor="confirmPassword">Confirm Password: </Label>
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
          {user.signup_error && (
            <ErrorMessage>{user.signup_error}</ErrorMessage>
          )}

          <Button
            type="submit"
            disabled={user.creating}
            style={{
              cursor: user.creating ? "not-allowed" : "pointer",
            }}
          >
            Create
          </Button>
        </Form>
        <LogInLink>
          <Text>Have an account? </Text>
          <CustomLink>
            <Link to="/login"> Log in </Link>
          </CustomLink>
        </LogInLink>
      </SignUpContainer>
    </SignUpPage>
  );
};

export default SignUp;
