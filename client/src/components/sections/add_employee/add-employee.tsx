/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormError,
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
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
import { AddEmployeeSchema } from "../../../schema/add-emp-schema";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { addEmpRequested } from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
export const AddEmployee = () => {
  const dispatcher = useAppDispatch();
  const { adding } = useAppSelector((state) => state.employee);
  const formHandler = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "",
      date_of_birth: "",
      date_of_hire: "",
      position: "",
      salary: 0,
    },
    validationSchema: AddEmployeeSchema,
    onSubmit: (values, _) => {
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
              <input
                type="radio"
                name="gender"
                id=""
                value="M"
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                checked={formHandler.values.gender === "M"}
              />
              <Label htmlFor="gender">Female</Label>
              <input
                type="radio"
                name="gender"
                id=""
                value="F"
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                checked={formHandler.values.gender === "F"}
              />
              <FormError>
                {formHandler.touched.gender && formHandler.errors.gender ? (
                  <div>{formHandler.errors.gender}</div>
                ) : null}
              </FormError>{" "}
            </GenderContainer>
          </Column>
          <Column>
            <InputContainer>
              <Label htmlFor="role">Role(Position)</Label>
              <Input
                placeholder=""
                type="text"
                id="position"
                name="position"
                value={formHandler.values.position}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.position && formHandler.errors.position ? (
                  <div>{formHandler.errors.position}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="role">Basic Salary</Label>
              <Input
                placeholder=""
                type="text"
                id="salary"
                name="salary"
                value={formHandler.values.salary}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.salary && formHandler.errors.salary ? (
                  <div>{formHandler.errors.salary}</div>
                ) : null}
              </FormError>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_birth">Birth Date</Label>
              <Input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formHandler.values.date_of_birth}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.date_of_birth &&
                formHandler.errors.date_of_birth ? (
                  <div>{formHandler.errors.date_of_birth}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_hire">Date of Hire</Label>
              <Input
                type="date"
                id="date_of_hire"
                name="date_of_hire"
                value={formHandler.values.date_of_hire}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.date_of_hire &&
                formHandler.errors.date_of_hire ? (
                  <div>{formHandler.errors.date_of_hire}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
          </Column>
          <AddButton type="submit">
            {adding ? <SmallSpinner /> : "Add"}
          </AddButton>
        </AddEmployeeForm>
      </AddEmployeeContainer>
    </Modal>
  );
};
