/* eslint-disable react-hooks/exhaustive-deps */
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
  OvertimeBody,
  OvertimeContainer,
  OvertimeForm,
} from "./add-overtime.style";
import { AddOvertimeSchema } from "../../../schema/add-overtime-schema";
import {
  addOvertimeRequested,
  closeOvertimeTask,
} from "../../../store/overtime/overtime-slice";
import { useAppDispatch } from "../../../utils/custom-hook";
import { useOvertime } from "../../../hooks/overtime-hook";
import { useEffect } from "react";
import { useNavigate } from "react-router";
export const AddOvertime = () => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { task_error, task_finished, curr_overtime } = useOvertime();
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
    if (curr_overtime && task_finished) {
      navigate(-1);
      clearAction();
    }
  }, [curr_overtime]);

  const clearAction = () => {
    dispatcher(closeOvertimeTask());
  };
  return (
    <Modal closeAction={clearAction}>
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
            <FormError>{task_error && <div>{task_error}</div>}</FormError>
            <AddBtn type="submit">Add</AddBtn>
          </OvertimeForm>
        </OvertimeBody>
      </OvertimeContainer>
    </Modal>
  );
};
