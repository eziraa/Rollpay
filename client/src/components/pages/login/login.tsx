/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
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

export const LoginPage = () => {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
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
    onSubmit: async (values, _) => {
      await dispatcher(loginRequested(values));
    },
  });

  return (
    !isAuthenticated && (
      <LoginContainer>
        <Title>Log In</Title>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <InputContainer>
            <Label>User name</Label>
            <Input
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.username && <ErrorMessage>{errors.username} </ErrorMessage>}
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
            {errors.password && <ErrorMessage>{errors.password} </ErrorMessage>}
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
    )
  );
};

