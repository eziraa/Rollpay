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
} from "../../../store/deduction/deduction-slice";
import { useEffect } from "react";
import { useDeduction } from "../../../hooks/deduction-hook";
import { AddDeductionSchema } from "../../../schema/add-deduction-schema";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useNavigate } from "react-router";
export const AddDeduction = () => {
  const dispatcher = useAppDispatch();
  const { curr_deduction, task_error, task_finished } = useDeduction();
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      deduction_type: "",
      deduction_rate: "",
    },
    validationSchema: AddDeductionSchema,
    onSubmit(values) {
      dispatcher(addDeductionRequested(values));
    },
  });
  useEffect(() => {
    if (curr_deduction) {
      navigate(-1);
      clearAction();
    }
  }, [curr_deduction]);

  const clearAction = () => {
    dispatcher(closeDeductionTask());
  };

  return (
    <Modal closeAction={clearAction}>
      <DeductionContainer>
        <DeductionBody>
          <Title>Add Deduction</Title>
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
              {!task_finished && !task_error ? <SmallSpinner /> : "Add"}
            </AddBtn>
          </DeductionForm>
        </DeductionBody>
      </DeductionContainer>
    </Modal>
  );
};
