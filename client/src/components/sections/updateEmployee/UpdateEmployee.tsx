import { UpdateContainer, Title } from "./UpdateEmployee.style";
import { ErrorMessage } from "../../pages/signup/SignUp.style";
import { useFormik } from "formik";
import { EmpPersonalInfo } from "../../../schema/AddEmpSchema";
import { useState } from "react";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Button,
} from "../../utils/form_elements/form.style";
import { Modal } from "../../utils/modal/modal";
import { CloseIcon } from "../../utils/buttons/close";

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
    <Modal>
      <UpdateContainer className="container">
        <CloseIcon />
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
            {errors.firstName && (
              <ErrorMessage>{errors.firstName} </ErrorMessage>
            )}
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
    </Modal>
  );
};

export default UpdateEmployee;
