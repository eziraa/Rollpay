/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Header } from "../../sections/header/header";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Button,
  Title,
  PasswordContainer,
} from "../../utils/form_elements/form.style";
import { PasswordVisible } from "../../utils/password_visiblity/password.style";
import { HomeContainer } from "../home/homepage.style";
import {
  Text,
  CheckboxContainer,
  CustomLink,
  LoginContainer,
  LinkContainer,
  Checkbox,
  ActionsContainer,
} from "./login.style";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LogInSchema } from "../../../schema/log-in-schema";
import { ErrorMessage } from "../signup/SignUp.style";
import { useAppDispatch, useAppSelector } from "../../../utils/customHook";
import { loginRequested } from "../../../store/user/userSLice";
import { useAuth } from "../../../contexts/authContext";
import { AddButton } from "../../sections/add_employee/add-employee.style";

export const LoginPage = () => {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: LogInSchema,
    onSubmit: (values, _) => {
      dispatcher(loginRequested(values));
    },
  });
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    // Redirect to login page or perform other actions as needed
  };
  return (
    <HomeContainer>
      <Header />
      {!isAuthenticated || !user.is_login ? (
        <LoginContainer>
          <Title>Log In</Title>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Label>User name</Label>
              <Input
                name="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.username && (
                <ErrorMessage>{errors.username} </ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Password</Label>
              <PasswordContainer>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <PasswordVisible onClick={togglePasswordVisiblity}>
                  {passwordVisible ? <RiEyeFill /> : <RiEyeOffFill />}
                </PasswordVisible>
              </PasswordContainer>
              {errors.password && (
                <ErrorMessage>{errors.password} </ErrorMessage>
              )}
            </InputContainer>
            <ActionsContainer>
              <CheckboxContainer>
                <Checkbox type="checkbox" /> <Text> Remember me</Text>
              </CheckboxContainer>
              <CustomLink>
                <Link to="/forgot_password">Frogot Password?</Link>
              </CustomLink>
            </ActionsContainer>
            <Button type="submit" onClick={(e) => e.stopPropagation()}>
              Login
            </Button>
          </Form>
          <LinkContainer>
            <Text>Don't have an account? </Text>
            <CustomLink>
              <Link to="/signup"> Sign up </Link>
            </CustomLink>
          </LinkContainer>
        </LoginContainer>
      ) : (
        <AddButton onClick={logout}>Log Out</AddButton>
      )}
    </HomeContainer>
  );
};
