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
              <Input
                placeholder=""
                type="text"
                id="first_name"
                name="first_name"
                value={formHandler.values.first_name}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.first_name &&
                formHandler.errors.first_name ? (
                  <div>{formHandler.errors.first_name}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                placeholder=""
                type="text"
                id="last_name"
                name="last_name"
                value={formHandler.values.last_name}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.last_name &&
                formHandler.errors.last_name ? (
                  <div>{formHandler.errors.last_name}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="phone_number">Phone Number</Label>
              <StyledPhoneInput
                placeholder="Enter phone number"
                country="et"
                value={formHandler.values.phone_number}
                onChange={(value) => {
                  formHandler.setFieldValue("phone_number", value);
                }}
              />
              <FormError>
                {formHandler.touched.phone_number &&
                formHandler.errors.phone_number ? (
                  <div>{formHandler.errors.phone_number}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder=""
                type="text"
                id="email"
                name="email"
                value={formHandler.values.email}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.email && formHandler.errors.email ? (
                  <div>{formHandler.errors.email}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <GenderContainer>
              <Label htmlFor="gender">Male</Label>
              <input type="radio" name="gender" id="" value="male" />
              <Label htmlFor="gender">Female</Label>
              <input type="radio" name="gender" id="" value="female" />
            </GenderContainer>
            <FormError>
              {formHandler.touched.gender && formHandler.errors.gender ? (
                <div>{formHandler.errors.gender}</div>
              ) : null}
            </FormError>{" "}
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
