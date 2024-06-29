/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useDeduction } from "../../../hooks/deduction-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  FormError,
  InputContainer,
  Label,
  Select,
  SelectOption,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import {
  AddBtn,
  DeductionBody,
  DeductionContainer,
  DeductionForm,
} from "../../sections/add-deduction/add-deduction.style";
import { Title } from "../../sections/add_employee/add-employee.style";
import { useEffect } from "react";
import { listDeductionsRequested } from "../../../store/deduction/deduction-slice";
import {
  addEmpDeductionRequested,
  closeEmployeeTask,
  resetEmployeeState,
} from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { Outlet, useNavigate, useParams } from "react-router";
import { useEmployee } from "../../../hooks/employee-hook";
import { useSalary } from "../../../hooks/salary-hook";
export const AddDeductionToEmp = () => {
  const { deductions, curr_deduction } = useDeduction();
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { employee_id } = useParams();
  const employee = useEmployee();
  const { curr_emp } = useSalary();
  useEffect(() => {
    if (curr_deduction) {
      dispatcher(listDeductionsRequested());
    }
  }, [curr_deduction, dispatcher]);
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      deduction_type: "",
      employee_id: employee_id || "",
    },
    onSubmit: (values) => {
      dispatcher(
        resetEmployeeState({
          ...employee,
          task_error: undefined,
        })
      );
      dispatcher(addEmpDeductionRequested(values));
    },
  });

  // Fetching list of deductions to able to add deduction to employee

  useEffect(() => {
    dispatcher(listDeductionsRequested());
  }, []);

  //Adding a method to close modal  properly
  const clearTask = () => {
    dispatcher(closeEmployeeTask());
  };
  return (
    <Modal closeAction={clearTask}>
      <DeductionContainer>
        <Outlet />
        <DeductionBody>
          <Title>Adding Deduction to {curr_emp?.employee.first_name}</Title>
          <DeductionForm
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label htmlFor="role">Select Deduction</Label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <Select
                  name="deduction_type"
                  style={{ flex: 2 }}
                  onChange={handleChange}
                >
                  <SelectOption value="" disabled selected={!curr_deduction}>
                    Select Deduction
                  </SelectOption>
                  {deductions.map(
                    (deduction) =>
                      deduction && (
                        <SelectOption
                          selected={deduction.id === curr_deduction?.id}
                          value={deduction.deduction_type}
                        >
                          {deduction.deduction_type}
                        </SelectOption>
                      )
                  )}
                </Select>
                <AddBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("add-new-deduction");
                  }}
                  style={{ flex: 1.2 }}
                >
                  {"Add New"}
                </AddBtn>
              </div>
              <FormError>
                {touched.deduction_type && errors.deduction_type ? (
                  <div>{errors.deduction_type}</div>
                ) : null}
              </FormError>
            </InputContainer>
            {employee.task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {employee.task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!employee.task_finished && !employee.task_error ? (
                <SmallSpinner />
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
