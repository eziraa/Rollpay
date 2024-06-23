import { useFormik } from "formik";
import {
  FormError,
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import { Title } from "../add_employee/add-employee.style";
import {
  AddBtn,
  PositionBody,
  PositionContainer,
  PositionForm,
} from "./add-position.style";
export const AddPosition = () => {
  const { touched, errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      position_name: "",
      base_salary: "",
    },
    onSubmit: (values) => {},
  });
  return (
    <Modal>
      <PositionContainer>
        <PositionBody>
          <Title>Add Position</Title>
          <PositionForm>
            <InputContainer>
              <Label>Position Name Name</Label>
              <Input
                type="text"
                onChange={handleChange}
                name="position_name"
                value={values.position_name}
              />
              {touched.position_name && errors.position_name && (
                <FormError> {errors.position_name} </FormError>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Base Salary</Label>
              <Input
                type="number"
                value={values.base_salary}
                name="base_salary"
                onChange={handleChange}
              />
              {touched.base_salary && errors.base_salary && (
                <FormError> {errors.base_salary} </FormError>
              )}
            </InputContainer>
            <AddBtn type="submit">Add</AddBtn>
          </PositionForm>
        </PositionBody>
      </PositionContainer>
    </Modal>
  );
};
