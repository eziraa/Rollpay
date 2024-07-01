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
import {
  addPositionRequested,
  closePositionTask,
} from "../../../store/position/position-slice";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_POSITION } from "../../../constants/tasks";
import { AddPositionSchema } from "../../../schema/add-position-schema";
import { useEffect } from "react";
import { usePosition } from "../../../hooks/position-hook";
export const AddPosition = () => {
  const dispatcher = useAppDispatch();
  const { closeModal } = useModal();
  const { task_error, curr_position } = usePosition();
  const { touched, errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      position_name: "",
      basic_salary: "",
    },
    validationSchema: AddPositionSchema,
    onSubmit: async (values) => {
      await dispatcher(addPositionRequested(values));
    },
  });

  useEffect(() => {
    curr_position && closeModal(ADD_POSITION);
  }, [curr_position, closeModal]);

  const clearAction = () => {
    dispatcher(closePositionTask());
  };
  return (
    <Modal closeAction={clearAction}>
      <PositionContainer>
        <PositionBody>
          <Title>Add Position</Title>
          <PositionForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
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
            {task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {" "}
                {task_error}
              </FormError>
            )}
            <AddBtn type="submit">Add</AddBtn>
          </PositionForm>
        </PositionBody>
      </PositionContainer>
    </Modal>
  );
};
