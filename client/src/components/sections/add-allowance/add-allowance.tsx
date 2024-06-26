import { useFormik } from "formik";
import { ADD_ALLOWANCE } from "../../../constants/tasks";
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
  AllowanceBody,
  AllowanceContainer,
  AllowanceForm,
} from "./add-allowance.style";
import { AddAllowanceSchema } from "../../../schema/add-allowance-schema";
import { useAppDispatch } from "../../../utils/custom-hook";
import { addAllowanceRequested } from "../../../store/allowance/allowance-slice";
import { useEffect } from "react";
import { useModal } from "../../../hooks/modal-hook";
import { useAllowance } from "../../../hooks/allowance-hook";
export const AddAllowance = () => {
  const dispatcher = useAppDispatch();
  const { curr_allowance, adding_allowance_error } = useAllowance();
  const { closeModal } = useModal();
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      allowance_type: "",
      allowance_rate: "",
    },
    validationSchema: AddAllowanceSchema,
    onSubmit(values) {
      alert("reached");
      dispatcher(addAllowanceRequested(values));
    },
  });
  useEffect(() => {
    curr_allowance && closeModal(ADD_ALLOWANCE);
  }, [curr_allowance, closeModal]);
  return (
    <Modal content={ADD_ALLOWANCE}>
      <AllowanceContainer>
        <AllowanceBody>
          <Title>Add Allowance</Title>
          <AllowanceForm onSubmit={handleSubmit}>
            <InputContainer>
              <Label>Allowance Name</Label>
              <Input
                name="allowance_type"
                onChange={handleChange}
                value={values.allowance_type}
                type="text"
              />
              {touched.allowance_type && errors.allowance_type && (
                <FormError> {errors.allowance_type} </FormError>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Allowance rate</Label>
              <Input
                name="allowance_rate"
                value={values.allowance_rate}
                onChange={handleChange}
                type="number"
              />
              {touched.allowance_rate && errors.allowance_rate && (
                <FormError> {errors.allowance_rate} </FormError>
              )}
            </InputContainer>
            {adding_allowance_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {" "}
                {adding_allowance_error}
              </FormError>
            )}
            <AddBtn type="submit">Add</AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};
