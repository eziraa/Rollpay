import { useFormik } from "formik";
import { ADD_DEDUCTION } from "../../../constants/tasks";
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
import { addDeductionRequested } from "../../../store/deduction/deduction-slice";
import { useEffect } from "react";
import { useModal } from "../../../hooks/modal-hook";
import { useDeduction } from "../../../hooks/deduction-hook";
import { AddDeductionSchema } from "../../../schema/add-deduction-schema";
import { SmallSpinner } from "../../utils/spinner/spinner";
export const AddDeduction = () => {
  const dispatcher = useAppDispatch();
  const { curr_deduction, adding_deduction_error, adding } = useDeduction();
  const { closeModal } = useModal();
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
    curr_deduction && closeModal(ADD_DEDUCTION);
  }, [curr_deduction, closeModal]);
  return (
    <Modal content={ADD_DEDUCTION}>
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
            {adding_deduction_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {adding_deduction_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {adding && !adding_deduction_error ? <SmallSpinner /> : "Add"}
            </AddBtn>
          </DeductionForm>
        </DeductionBody>
      </DeductionContainer>
    </Modal>
  );
};
