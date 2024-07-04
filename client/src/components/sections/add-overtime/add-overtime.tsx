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
  editOvertimeRequested,
  getOvertimeRequested,
  resetOvertimeState,
} from "../../../store/overtime/overtime-slice";
import { useAppDispatch } from "../../../utils/custom-hook";
import { useOvertime } from "../../../hooks/overtime-hook";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
export const AddOvertime = () => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { task_error } = useOvertime();
  const overtime = useOvertime();
  const { overtime_id } = useParams();

  useEffect(() => {
    overtime_id && dispatcher(getOvertimeRequested(overtime_id));
  }, [overtime_id]);
  useEffect(() => {
    if (overtime.curr_overtime && overtime_id) {
      setFieldValue("overtime_type", overtime.curr_overtime.overtime_type);
      setFieldValue("overtime_rate", overtime.curr_overtime.overtime_rate);
    }
  }, [overtime.curr_overtime]);
  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    dirty,
  } = useFormik({
    initialValues: {
      overtime_type: "",
      overtime_rate: "",
    },
    validationSchema: AddOvertimeSchema,
    onSubmit(values) {
      dispatcher(
        resetOvertimeState({
          ...overtime,
          task_error: undefined,
        })
      );
      if (dirty) {
        if (overtime_id) {
          dispatcher(editOvertimeRequested({ ...values, id: overtime_id }));
        } else dispatcher(addOvertimeRequested(values));
      } else {
        dispatcher(
          setFlashMessage({
            desc: "No changes to save",
            title: "No changes made",
            status: true,
            duration: 3,
            type: "error",
          })
        );
      }
    },
  });
  useEffect(() => {
    if (isSubmitting && overtime.task_finished) {
      dispatcher(resetOvertimeState({ ...overtime, task_error: undefined }));
      navigate(-1);
    }
  }, [overtime.task_finished]);

  const clearAction = () => {
    dispatcher(closeOvertimeTask());
  };
  return (
    <Modal closeAction={clearAction}>
      <OvertimeContainer>
        <OvertimeBody>
          <Title>{overtime_id ? 'Edit' : 'Add'} Overtime</Title>
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
            <AddBtn type="submit">{overtime_id ? 'Save':'Add'}</AddBtn>
          </OvertimeForm>
        </OvertimeBody>
      </OvertimeContainer>
    </Modal>
  );
};
