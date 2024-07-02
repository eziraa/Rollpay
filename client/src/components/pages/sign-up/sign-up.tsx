import { SignUpContainer, ErrorMessage } from "./sign-up.style";
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
import { signUpRequested } from "../../../store/user/user-slice";
import { CustomLink, LinkContainer, Text } from "../login/login.style";
import { Link } from "react-router-dom";

const SignUp = () => {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);
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
        dispatcher(signUpRequested(values));
      },
    });
  useEffect(() => {
    if (user.acc_created) window.location.href = "/";
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
      <SignUpContainer className="container">
        <Title>Sign up</Title>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
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

          <InputContainer>
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
            {" "}
            Create{" "}
          </Button>
        </Form>
        <LinkContainer>
          <Text>Have an account? </Text>
          <CustomLink>
            <Link to="/"> Log in </Link>
          </CustomLink>
        </LinkContainer>
      </SignUpContainer>
    </SignUpPage>
  );
};

export default SignUp;
