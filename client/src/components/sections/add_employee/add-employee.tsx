import { useState } from "react";
import {
  FormError,
  Input,
  InputContainer,
  Label,
} from "../../utils/form_elements/form.style";
import { Modal } from "../../utils/modal/modal";
import {
  AddButton,
  AddEmployeeContainer,
  AddEmployeeForm,
  Column,
  GenderContainer,
  StyledPhoneInput,
  Title,
} from "./add-employee.style";
import { useFormik } from "formik";
import { AddEmployeeSchema } from "../../../schema/AddEmpSchema";
import { useAppDispatch } from "../../../utils/customHook";
import { addEmpRequested } from "../../../store/employee/employeeSlice";
export const AddEmployee = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatcher = useAppDispatch();
  const formHandler = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "",
      date_of_birth: "",
      date_of_hire: "",
      role: "",
    },
    validationSchema: AddEmployeeSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatcher(addEmpRequested(values));
    },
  });
  return (
    <Modal>
      <AddEmployeeContainer>
        <Title>Add Employee</Title>
        <AddEmployeeForm
          onSubmit={(e) => {
            e.preventDefault();
            formHandler.handleSubmit(e);
          }}
        >
          <Column>
            <InputContainer>
              <Label htmlFor="first_name">First Name</Label>
              <Input type="text" name="first_name" />
              <FormError></FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="last_name">Last Name</Label>
              <Input type="text" name="last_name" />
              <FormError></FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="phone_number">Phone Number</Label>
              <StyledPhoneInput
                placeholder="Enter phone number"
                country="et"
                value={phoneNumber}
                onChange={() => setPhoneNumber}
              />
              <FormError></FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">Email</Label>
              <Input type="text" name="email" />
              <FormError></FormError>{" "}
            </InputContainer>
            <GenderContainer>
              <Label htmlFor="gender">Male</Label>
              <input type="radio" name="gender" id="" value="male" />
              <Label htmlFor="gender">Female</Label>
              <input type="radio" name="gender" id="" value="female" />
            </GenderContainer>
            <FormError></FormError>
          </Column>
          <Column>
            <InputContainer>
              <Label htmlFor="role">Role(Position)</Label>
              <Input type="text" name="role" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_birth">Birth Date</Label>
              <Input type="date" name="date_of_birth" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_hire">Date of Hire</Label>
              <Input type="date" name="date_of_hire" />
            </InputContainer>
            <AddButton>Add</AddButton>
          </Column>
        </AddEmployeeForm>
      </AddEmployeeContainer>
    </Modal>
  );
};
