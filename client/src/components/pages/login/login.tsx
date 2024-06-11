import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Button,
  Title,
  PasswordContainer,
} from "../../utils/form-elements/form.style";
import { PasswordVisible } from "../../utils/password-visiblity/password.style";
import {
  Text,
  CheckboxContainer,
  CustomLink,
  LoginContainer,
  LinkContainer,
  Checkbox,
  ActionsContainer,
} from "./login.style";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LogInSchema } from "../../../schema/log-in-schema";
import { ErrorMessage } from "../sign-up/sign-up.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { loginRequested } from "../../../store/user/user-slice";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

export const LoginPage = () => {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (user.is_login) window.location.href = "/home-page";
  }, [user]);
  const { touched, values, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LogInSchema,
      onSubmit: async (values, _) => {
        await dispatcher(loginRequested(values));
      },
    });

  return (
    <LoginContainer>
      <Title>Log In</Title>
      <Form
        onSubmit={(e) => {
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
          {touched.username && errors.username && (
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
              {passwordVisible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </PasswordVisible>
          </PasswordContainer>
          {touched.password && errors.password && (
            <ErrorMessage>{errors.password} </ErrorMessage>
          )}
          {user.login_error && <ErrorMessage>{user.login_error} </ErrorMessage>}
        </InputContainer>
        <ActionsContainer>
          <CheckboxContainer>
            <Checkbox type="checkbox" /> <Text> Remember me</Text>
          </CheckboxContainer>
          <CustomLink>
            <Link to="/forgot_password">Frogot Password?</Link>
          </CustomLink>
        </ActionsContainer>
        <Button type="submit">Login</Button>
      </Form>
      <LinkContainer>
        <Text>Don't have an account? </Text>
        <CustomLink>
          <Link to="/signup"> Sign up </Link>
        </CustomLink>
      </LinkContainer>
    </LoginContainer>
  );
};
