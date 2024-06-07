import { Button } from "../../../utils/buttons/submit.style";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "./signup.css";
import {
  SignUpContainer,
  Title,
  Input,
  InputName,
  InputBox,
  ErrorMessage,
  Form,
  ToggleIcon,
  PasswordContainer,
  PhoneNumberInput,
} from "./SignUp.style";

import { useFormik } from "formik";
import { SignUpValidation } from "../../../validations/signUpValidation";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import "./signup.css";
const SignUp = () => {
  const initialValues = {
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: SignUpValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  return (
    <SignUpContainer className="container">
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit}>
        <InputBox>
          <InputName htmlFor="username">Username: </InputName>
          <Input
            type="text"
            name="username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.username && <ErrorMessage>{errors.username} </ErrorMessage>}
        </InputBox>

        <InputBox>
          <InputName htmlFor="email">Email: </InputName>
          <Input
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email} </ErrorMessage>}
        </InputBox>

        <InputBox>
          <InputName htmlFor="phone_number">Phone Number: </InputName>
          <PhoneNumberInput
            value={values.phone_number}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=""
            inputClass="phone-number"
          />
          {errors.email && <ErrorMessage>{errors.email} </ErrorMessage>}
        </InputBox>

        <InputBox>
          <InputName htmlFor="password">Password: </InputName>
          <PasswordContainer>
            <ToggleIcon onClick={toggleVisiblity}>
              {visible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </ToggleIcon>

            <input
              type={visible ? "text" : "password"}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </PasswordContainer>

          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputBox>

        <InputBox>
          <InputName htmlFor="confirmPassword">Confirm Password: </InputName>
          <PasswordContainer>
            <ToggleIcon onClick={toggleVisiblity}>
              {visible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </ToggleIcon>

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
        </InputBox>

        <Button type="submit"> Create </Button>
      </Form>
    </SignUpContainer>
  );
};

export default SignUp;
