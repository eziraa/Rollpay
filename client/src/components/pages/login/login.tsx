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
  LoginSection,
} from "./login.style";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { LogInSchema } from "../../../schema/log-in-schema";
import { ErrorMessage } from "../sign-up/sign-up.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { loginRequested } from "../../../store/user/user-slice";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { Toggle } from "../../utils/buttons/toggle";
import { EmpsDisplayerHeader as Header } from "../display-employee/display-employee.style";
import { useUser } from "../../../hooks/user-hook";

export const LoginPage = () => {
  const dispatcher = useAppDispatch();
  const { is_login, login_error, logging_in } = useUser();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (is_login) {
      window.location.href = "/";
    }
  }, [is_login]);

  const { touched, values, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LogInSchema,
      onSubmit: async (values) => {
        await dispatcher(loginRequested(values));
      },
    });

  return (
    <LoginContainer>
      <LoginSection>
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "30%",
          }}
        >
          <Title>Log In</Title>
          <Toggle />
        </Header>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          style={{
            gap: "2rem",
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
            {login_error && <ErrorMessage>{login_error} </ErrorMessage>}
          </InputContainer>
          <ActionsContainer>
            <CheckboxContainer>
              <Checkbox type="checkbox" /> <Text> Remember me</Text>
            </CheckboxContainer>
            <CustomLink>
              <Link to="/forgot_password">Frogot Password?</Link>
            </CustomLink>
          </ActionsContainer>
          <Button type="submit" disabled={logging_in}>
            {logging_in ? <SmallSpinner /> : "Login"}
          </Button>
        </Form>
        <LinkContainer>
          <Text>Don't have an account? </Text>
          <CustomLink>
            <Link to="/signup"> Sign up</Link>
          </CustomLink>
        </LinkContainer>
      </LoginSection>
    </LoginContainer>
  );
};
