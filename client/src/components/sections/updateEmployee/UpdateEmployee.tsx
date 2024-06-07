import { UpdateContainer, Title, Close } from "./UpdateEmployee.style";
import { ErrorMessage } from "../../pages/signup/SignUp.style";
import { useFormik } from "formik";
import { EmpPersonalInfo } from "../../../validations/empPersonalInfo";
import { useState } from "react";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Button,
} from "../../utils/form_elements/form.style";
import { FlashMessageClose } from "../../utils/flash_message/flash_message.style";

const UpdateEmployee = () => {
  const [employeeData] = useState({
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
      <FlashMessageClose>
        <Close />{" "}
      </FlashMessageClose>
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
          <Label htmlFor="firstName">First Name: </Label>
          <Input
            type="text"
            name="firstName"
            value={values.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.firstName && <ErrorMessage>{errors.firstName} </ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="lastName">Last Name: </Label>
          <Input
            type="text"
            name="lastName"
            value={values.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.lastName && <ErrorMessage>{errors.lastName} </ErrorMessage>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="email">Email: </Label>
          <Input
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email} </ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="phoneNumber">Phone Number: </Label>
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
        </InputContainer>

        <Button type="submit"> Update </Button>
      </Form>
    </UpdateContainer>
  );
};

export default UpdateEmployee;
