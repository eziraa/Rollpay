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
  AllowanceBody,
  AllowanceContainer,
  AllowanceForm,
} from "./add-allowance.style";
import { AddAllowanceSchema } from "../../../schema/add-allowance-schema";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  addAllowanceRequested,
  closeAllowanceTask,
  resetAllowanceState,
} from "../../../store/allowance/allowance-slice";
import { useEffect } from "react";
import { useAllowance } from "../../../hooks/allowance-hook";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useNavigate } from "react-router";
export const AddAllowance = () => {
  // Getting necessary information
  const dispatcher = useAppDispatch();
  const allowance = useAllowance();
  const navigate = useNavigate();
  // initializing formik instance
  const { values, handleChange, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        allowance_type: "",
        allowance_rate: "",
      },
      validationSchema: AddAllowanceSchema,
      onSubmit(values) {
        dispatcher(
          resetAllowanceState({
            ...allowance,
            task_error: undefined,
          })
        );
        dispatcher(addAllowanceRequested(values));
      },
    });

  // Writing use effect to close modal after succefully adding allowance

  useEffect(() => {
    if (isSubmitting && allowance.task_finished) {
      dispatcher(resetAllowanceState({ ...allowance, task_error: undefined }));
      navigate(-1);
    }
  }, [allowance.task_finished]);

  const clearTask = () => {
    dispatcher(closeAllowanceTask());
  };
  return (
    <Modal closeAction={clearTask}>
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
            {allowance.task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {allowance.task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!allowance.task_finished && !allowance.task_error ? (
                <SmallSpinner />
              ) : (
                "Add"
              )}
            </AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};
