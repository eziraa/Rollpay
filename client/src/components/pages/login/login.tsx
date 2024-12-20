/* eslint-disable react-hooks/exhaustive-deps */
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
  CustomLink,
  LoginContainer,
  LinkContainer,
  ActionsContainer,
  LoginSection,
} from "./login.style";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LogInSchema } from "../../../schema/log-in-schema";
import { ErrorMessage } from "../sign-up/sign-up.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { loginRequested } from "../../../store/user/user-slice";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { EmpsDisplayerHeader as Header } from "../display-employee/display-employee.style";
import { useUser } from "../../../hooks/user-hook";
import { useAuth } from "../../../hooks/auth-hook";

export const LoginPage = () => {
  const dispatcher = useAppDispatch();
  const auth = useAuth();
  const user = useUser();
  const { login_error, logging_in } = useUser();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.curr_user.role) {
      navigate("/");
      window.location.reload();
    }
  }, [auth.curr_user]);

  const { touched, values, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LogInSchema,
      onSubmit: async (values) => {
        dispatcher(loginRequested(values));
      },
    });

  useEffect(() => {
    if (user.user) {
      user.user && auth.setCurrUser(user.user);
    }
  }, [user.user]);

  return (
    <LoginContainer>
      <LoginSection className="shadow-lg">
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30%",
            marginBottom: "0",
          }}
        >
          <Title className="font-semibold from-green-400 to-pink-600 text-slate-700 ">
            Log In
          </Title>
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
              <Input
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
            <CustomLink>
              <Link to="/forgot-password">Frogot Password?</Link>
            </CustomLink>
          </ActionsContainer>
          <Button type="submit" disabled={logging_in}>
            {logging_in ? <SmallSpinner /> : "Login"}
          </Button>
        </Form>
        <LinkContainer>
          <Text>Don't have an account? </Text>
          <CustomLink>
            <Link to="/sign-up"> Sign up</Link>
          </CustomLink>
        </LinkContainer>
      </LoginSection>
    </LoginContainer>
  );
};
