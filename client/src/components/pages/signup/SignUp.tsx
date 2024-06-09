import { SignUpContainer, ErrorMessage, Title } from "./SignUp.style";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../schema/SignUpSchema";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { HomeContainer } from "../home/homepage.style";
import { Header } from "../../sections/header/header";
import {
  Button,
  Form,
  Input,
  InputContainer,
  Label,
  PasswordContainer,
} from "../../utils/form_elements/form.style";
import { PasswordVisible } from "../../utils/password_visiblity/password.style";
import { useAppDispatch, useAppSelector } from "../../../utils/customHook";
import { signUpRequested } from "../../../store/user/userSLice";

const SignUp = () => {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const initialValues = {
    username: "",
    empID: "",
    password: "",
    confirmPassword: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      dispatcher(signUpRequested(values));
    },
  });
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  return (
    <HomeContainer>
      <Header />
      <SignUpContainer className="container">
        <Title>Create Account</Title>
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
            {errors.username && <ErrorMessage>{errors.username} </ErrorMessage>}
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
            {errors.empID && <ErrorMessage>{errors.empID} </ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">Password: </Label>
            <PasswordContainer>
              <PasswordVisible onClick={toggleVisiblity}>
                {visible ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </PasswordVisible>

              <input
                type={visible ? "text" : "password"}
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </PasswordContainer>

            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <Label htmlFor="confirmPassword">Confirm Password: </Label>
            <PasswordContainer>
              <PasswordVisible onClick={toggleVisiblity}>
                {visible ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </PasswordVisible>

              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </PasswordContainer>

            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword} </ErrorMessage>
            )}
          </InputContainer>

          <Button
            type="submit"
            disabled={user.adding}
            style={{
              cursor: user.adding ? "not-allowed" : "pointer",
            }}
          >
            {" "}
            Create{" "}
          </Button>
        </Form>
      </SignUpContainer>
    </HomeContainer>
  );
};

export default SignUp;
