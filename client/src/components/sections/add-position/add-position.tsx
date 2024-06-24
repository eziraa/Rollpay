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
import { useAppDispatch } from "../../../utils/custom-hook";
import { addPositionRequested } from "../../../store/position/position-slice";
import { useModal } from "../../../hooks/modal-hook";
import { CLOSE_MODAL } from "../../../constants/tasks";
export const AddPosition = () => {
  const dispatcher = useAppDispatch();
  const { openModal } = useModal();
  const { touched, errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      position_name: "",
      basic_salary: "",
    },
    onSubmit: (values) => {
      dispatcher(addPositionRequested(values));
      openModal(CLOSE_MODAL);
    },
  });

  return (
    <Modal>
      <PositionContainer>
        <PositionBody>
          <Title>Add Position</Title>
          <PositionForm onSubmit={handleSubmit}>
            <InputContainer>
              <Label>Position Name</Label>
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
                value={values.basic_salary}
                name="basic_salary"
                onChange={handleChange}
              />
              {touched.basic_salary && errors.basic_salary && (
                <FormError> {errors.basic_salary} </FormError>
              )}
            </InputContainer>
            <AddBtn type="submit">Add</AddBtn>
          </PositionForm>
        </PositionBody>
      </PositionContainer>
    </Modal>
  );
};
