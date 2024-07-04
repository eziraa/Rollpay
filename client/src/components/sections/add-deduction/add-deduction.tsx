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
  DeductionBody,
  DeductionContainer,
  DeductionForm,
} from "./add-deduction.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  addDeductionRequested,
  closeDeductionTask,
  editDeductionRequested,
  getDeductionRequested,
  resetDeductionState,
} from "../../../store/deduction/deduction-slice";
import { useEffect } from "react";
import { useDeduction } from "../../../hooks/deduction-hook";
import { AddDeductionSchema } from "../../../schema/add-deduction-schema";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
export const AddDeduction = () => {
  const dispatcher = useAppDispatch();
  const { task_error, task_finished } = useDeduction();
  const navigate = useNavigate();
  const deduction = useDeduction();
  const { deduction_id } = useParams();

  useEffect(() => {
    deduction_id && dispatcher(getDeductionRequested(deduction_id));
  }, [deduction_id]);
  useEffect(() => {
    if (deduction.curr_deduction && deduction_id) {
      setFieldValue("deduction_type", deduction.curr_deduction.deduction_type);
      setFieldValue("deduction_rate", deduction.curr_deduction.deduction_rate);
    }
  }, [deduction.curr_deduction]);
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
      deduction_type: "",
      deduction_rate: "",
    },
    validationSchema: AddDeductionSchema,
    onSubmit(values) {
      dispatcher(
        resetDeductionState({
          ...deduction,
          task_error: undefined,
        })
      );
      if (dirty) {
        if (deduction_id) {
          dispatcher(editDeductionRequested({ ...values, id: deduction_id }));
        } else dispatcher(addDeductionRequested(values));
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
    if (isSubmitting && deduction.task_finished) {
      dispatcher(resetDeductionState({ ...deduction, task_error: undefined }));
      navigate(-1);
    }
  }, [deduction.task_finished]);

  const clearAction = () => {
    dispatcher(closeDeductionTask());
  };

  return (
    <Modal closeAction={clearAction}>
      <DeductionContainer>
        <DeductionBody>
          <Title>{deduction_id ? 'Edit' : 'Add'} Deduction</Title>
          <DeductionForm onSubmit={handleSubmit}>
            <InputContainer>
              <Label>Deduction Name</Label>
              <Input
                name="deduction_type"
                onChange={handleChange}
                value={values.deduction_type}
                type="text"
              />
              {touched.deduction_type && errors.deduction_type && (
                <FormError> {errors.deduction_type} </FormError>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Deduction rate</Label>
              <Input
                name="deduction_rate"
                value={values.deduction_rate}
                onChange={handleChange}
                type="number"
              />
              {touched.deduction_rate && errors.deduction_rate && (
                <FormError> {errors.deduction_rate} </FormError>
              )}
            </InputContainer>
            {task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!task_finished && !task_error ? (
                <SmallSpinner />
              ) : deduction_id ? (
                "Save"
              ) : (
                "Add"
              )}
            </AddBtn>
          </DeductionForm>
        </DeductionBody>
      </DeductionContainer>
    </Modal>
  );
};
