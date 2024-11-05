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
import { Checkbox, FormControlLabel } from "@mui/material";
export const RaiseSalary = () => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { task_error } = useSalary();
  const salary = useSalary();

  const {
    values,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      rate: 0,
      reason: "",
      employees: [],
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
      alert(JSON.stringify(values, null, 2));
      dispatcher(raiseSalaryRequest(values));
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
        <OvertimeBody
          style={{
            width: "fit-content",
          }}
        >
          <Title>Raise Salary</Title>
          <OvertimeForm
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label>Raise percent</Label>
              <Input
                name="rate"
                type="number"
                onChange={handleChange}
                value={values.rate}
              />
            </InputContainer>
            <InputContainer>
              <Label>Reason</Label>
              <Input
                name="reason"
                type="text"
                onChange={handleChange}
                value={values.reason}
              />
            </InputContainer>
            <InputContainer>
              <Label>Select Employees</Label>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  maxHeight: "20rem",
                  overflowY: "auto",
                  padding: "0.2rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                {salary.employees.map((employee) => (
                  <div className="w-full">
                    <FormControlLabel
                      className="hover:bg-gray-100 w-[30rem] px-4 "
                      key={employee.employee_id}
                      value={employee.employee_id}
                      onChange={(_, checked) => {
                        if (checked) {
                          setFieldValue("employees", [
                            ...values.employees,
                            employee.employee_id,
                          ]);
                        } else {
                          setFieldValue(
                            "employees",
                            values.employees.filter(
                              (id) => id !== employee.employee_id
                            )
                          );
                        }
                      }}
                      label={
                        <div className="flex gap-3 justify-start px-3">
                          <p>{employee.employee_id}</p>
                          <p>{employee.employee_name}</p>
                        </div>
                      }
                      control={<Checkbox />}
                    />
                  </div>
                ))}
              </div>
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
