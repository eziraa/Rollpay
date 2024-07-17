/* eslint-disable react-hooks/exhaustive-deps */
import { FormikErrors, useFormik } from "formik";
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
} from "../add-overtime/add-overtime.style";

import { useAppDispatch } from "../../../utils/custom-hook";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSalary } from "../../../hooks/salary-hook";
import {
  raiseSalaryRequest,
  resetSalaryState,
} from "../../../store/salary/salary-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
export const RaiseSalary = () => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { task_error } = useSalary();
  const salary = useSalary();
  const { values, isSubmitting, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: {
        rate: 0,
      },
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: true,
      validate(value): FormikErrors<{
        rate: number;
      }> {
        if (value.rate === 0) errors.rate == "Please enter rate ";
        return errors;
      },
      onSubmit(values) {
        dispatcher(raiseSalaryRequest(values.rate));
      },
    });
  useEffect(() => {
    if (isSubmitting && !salary.adding) {
      dispatcher(resetSalaryState({ ...salary, task_error: undefined }));
      navigate(-1);
    }
  }, [salary.adding]);

  const clearAction = () => {
    dispatcher(
      resetSalaryState({
        ...salary,
        adding: false,
        task_finished: true,
        task_error: undefined,
      })
    );
  };
  return (
    <Modal closeAction={clearAction}>
      <OvertimeContainer>
        <OvertimeBody>
          <Title>Raise Salary</Title>
          <OvertimeForm
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label>Raise rate</Label>
              <Input
                name="rate"
                type="number"
                onChange={handleChange}
                value={values.rate}
              />
            </InputContainer>
            <FormError>{errors.rate && <div>{errors.rate}</div>}</FormError>
            <FormError>{task_error && <div>{task_error}</div>}</FormError>
            <AddBtn type="submit">
              {salary.loading && isSubmitting && !task_error ? (
                <SmallSpinner />
              ) : (
                "Raise"
              )}
            </AddBtn>
          </OvertimeForm>
        </OvertimeBody>
      </OvertimeContainer>
    </Modal>
  );
};
