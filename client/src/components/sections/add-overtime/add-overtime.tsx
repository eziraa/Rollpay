import { useFormik } from "formik";
import { ADD_OVERTIME } from "../../../constants/tasks";
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
  OvertimeBody,
  OvertimeContainer,
  OvertimeForm,
} from "./add-overtime.style";
import { AddOvertimeSchema } from "../../../schema/add-overtime-schema";
import { addOvertimeRequested } from "../../../store/overtime/overtime-slice";
import { useAppDispatch } from "../../../utils/custom-hook";
import { useOvertime } from "../../../hooks/overtime-hook";
import { useEffect } from "react";
import { useModal } from "../../../hooks/modal-hook";
export const AddOvertime = () => {
  const dispatcher = useAppDispatch();
  const {  closeModal } = useModal();
  const { adding_overtime_error, adding, curr_overtime } = useOvertime();
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      overtime_type: "",
      overtime_rate: "",
    },
    validationSchema: AddOvertimeSchema,
    onSubmit(values) {
      dispatcher(addOvertimeRequested(values));
    },
  });

  useEffect(() => {
    curr_overtime && !adding && closeModal(ADD_OVERTIME);
  }, [curr_overtime]);
  return (
    <Modal content={ADD_OVERTIME}>
      <OvertimeContainer>
        <OvertimeBody>
          <Title>Add Overtime</Title>
          <OvertimeForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label>Overtime Name</Label>
              <Input
                name="overtime_type"
                type="text"
                onChange={handleChange}
                value={values.overtime_type}
              />
            </InputContainer>
            <FormError>
              {touched.overtime_type && errors.overtime_type && (
                <div>{errors.overtime_type}</div>
              )}
            </FormError>
            <InputContainer>
              <Label>Overtime rate</Label>
              <Input
                name="overtime_rate"
                type="number"
                onChange={handleChange}
                value={values.overtime_rate}
              />
            </InputContainer>

            <FormError>
              {touched.overtime_type && errors.overtime_type && (
                <div>{errors.overtime_type}</div>
              )}
            </FormError>
            <FormError>
              {adding_overtime_error && <div>{adding_overtime_error}</div>}
            </FormError>
            <AddBtn type="submit">Add</AddBtn>
          </OvertimeForm>
        </OvertimeBody>
      </OvertimeContainer>
    </Modal>
  );
};
