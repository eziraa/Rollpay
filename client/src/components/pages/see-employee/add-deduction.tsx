import { useFormik } from "formik";
import { useDeduction } from "../../../hooks/deduction-hook";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
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
import { ADD_DEDUCTION, ADD_DEDUCTION_TO_EMP } from "../../../constants/tasks";
import { addEmpDeductionRequested } from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useModal } from "../../../hooks/modal-hook";
export const AddDeductionToEmp = () => {
  const { deductions, curr_deduction } = useDeduction();
  const dispatcher = useAppDispatch();
  const employee = useAppSelector((state) => state.employee);
  const { curr_emp } = useAppSelector((state) => state.salary);
  const { openModal } = useModal();
  useEffect(() => {
    if (curr_deduction) {
      dispatcher(listDeductionsRequested());
    }
  }, [curr_deduction, dispatcher]);
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      deduction_type: "",
      employee_id: curr_emp?.employee.id || "",
    },
    onSubmit: (values) => {
      dispatcher(addEmpDeductionRequested(values));
    },
  });

  return (
    <Modal content={ADD_DEDUCTION_TO_EMP}>
      <DeductionContainer>
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
                    openModal(ADD_DEDUCTION);
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
            {employee.adding_emp_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {employee.adding_emp_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {employee.editing && !employee.adding_emp_error ? (
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
