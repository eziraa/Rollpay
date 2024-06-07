import { Button } from "../../utils/buttons/submit.style";
import {
  UpdateContainer,
  Title,
  ProfileImage,
  ProfileImageContainer,
  FileInput,
  Close,
} from "./UpdateEmployee.style";
import {
  Input,
  InputName,
  InputBox,
  ErrorMessage,
  Form,
} from "../../pages/signup/SignUp.style";
import { useFormik } from "formik";
import { EmpPersonalInfo } from "../../../validations/empPersonalInfo";
import { useEffect, useState } from "react";

const UpdateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    profilePicture: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });

  // fetch employee data
  // useEffect(()=>{
  //   setEmployeeData("")
  // })
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: employeeData,
    validationSchema: EmpPersonalInfo,
    onSubmit: (values) => {
      // update employee data
      console.log(values);
    },
  });

  return (
    <UpdateContainer className="container">
      <Close />
      <Title>Update Personal Information</Title>

      <Form onSubmit={handleSubmit}>
        {/* <ProfileImageContainer>
          <ProfileImage />

          <FileInput
            type="file"
            name="profilePicture"
            value={values.profilePicture}
            accept="image/png,image/jpeg,image/webp"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </ProfileImageContainer> */}
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
          <InputName htmlFor="firstName">First Name: </InputName>
          <Input
            type="text"
            name="firstName"
            value={values.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.firstName && <ErrorMessage>{errors.firstName} </ErrorMessage>}
        </InputBox>
        <InputBox>
          <InputName htmlFor="lastName">Last Name: </InputName>
          <Input
            type="text"
            name="lastName"
            value={values.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.lastName && <ErrorMessage>{errors.lastName} </ErrorMessage>}
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
          <InputName htmlFor="phoneNumber">Phone Number: </InputName>
          <Input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber} </ErrorMessage>
          )}
        </InputBox>

        <Button type="submit"> Update </Button>
      </Form>
    </UpdateContainer>
  );
};

export default UpdateEmployee;
