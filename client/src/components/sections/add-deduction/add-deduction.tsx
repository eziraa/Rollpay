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
  resetDeductionState,
} from "../../../store/deduction/deduction-slice";
import { useEffect } from "react";
import { useDeduction } from "../../../hooks/deduction-hook";
import { AddDeductionSchema } from "../../../schema/add-deduction-schema";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { closeAllowanceTask } from "../../../store/allowance/allowance-slice";
export const AddDeduction = () => {
  // Defing hooks and getting informarmation
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const deduction = useDeduction();
  const { deduction_id } = useParams();

  // Getting editable deduction
  const editable_deduction = deduction.deductions.find(
    (deduction) => deduction.id == deduction_id
  );

  //Defing formik intstance
  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    touched,
    dirty,
  } = useFormik({
    initialValues: {
      deduction_type: editable_deduction
        ? editable_deduction.deduction_type
        : "",
      deduction_rate: editable_deduction
        ? editable_deduction?.deduction_rate
        : "",
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
    if (isSubmitting && !deduction.deleting && !deduction.editing) {
      dispatcher(resetDeductionState({ ...deduction, task_error: undefined }));
      navigate(-1);
    }
  }, [deduction.task_finished]);

  const clearAction = () => {
    dispatcher(closeAllowanceTask());
  };

  return (
    <Modal closeAction={clearAction}>
      <DeductionContainer>
        <DeductionBody>
          <Title>{deduction_id ? "Edit" : "Add"} Deduction</Title>
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
            {deduction.task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {deduction.task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!deduction.editing &&
              deduction.adding &&
              !deduction.task_error ? (
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
