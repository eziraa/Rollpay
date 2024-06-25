import { useFormik } from "formik";
import { useEmployee } from "../../../hooks/employee-hook";
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
} from "../add-deduction/add-deduction.style";
import { Title } from "../add_employee/add-employee.style";
import { useEffect } from "react";
import { listDeductionsRequested } from "../../../store/deduction/deduction-slice";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_DEDUCTION, ADD_DEDUCTION_TO_EMP } from "../../../constants/tasks";
import { useDeduction } from "../../../hooks/deduction-hook";
export const AddDeductionToEmp = () => {
  const { deductions, curr_deduction } = useDeduction();
  const dispatcher = useAppDispatch();
  const employee = useEmployee();
  const { openModal } = useModal();
  useEffect(() => {
    if (curr_deduction) {
      dispatcher(listDeductionsRequested());
    }
  }, [curr_deduction, dispatcher]);
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      deduction_name: "",
      employee_id: employee.curr_emp?.id,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Modal content={ADD_DEDUCTION_TO_EMP}>
      <DeductionContainer>
        <DeductionBody>
          <Title>Adding Deduction to {employee.curr_emp?.first_name}</Title>
          <DeductionForm
            onSubmit={(e) => {
              e.preventDefault();
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
                <Select style={{ flex: 2 }} onChange={handleChange}>
                  <SelectOption value="" disabled selected={!curr_deduction}>
                    Select Position
                  </SelectOption>
                  {deductions.map(
                    (deduction) =>
                      deduction && (
                        <SelectOption
                          selected={deduction.id === curr_deduction?.id}
                          value={deduction.deduction_name}
                          onChange={handleChange}
                        >
                          {deduction.deduction_name}
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
                {touched.deduction_name && errors.deduction_name ? (
                  <div>{errors.deduction_name}</div>
                ) : null}
              </FormError>
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </DeductionForm>
        </DeductionBody>
      </DeductionContainer>
    </Modal>
  );
};
