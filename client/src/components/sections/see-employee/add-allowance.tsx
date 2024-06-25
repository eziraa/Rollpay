import { useFormik } from "formik";
import { useAllowance } from "../../../hooks/allowance-hook";
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
  AllowanceBody,
  AllowanceContainer,
  AllowanceForm,
} from "../add-allowance/add-allowance.style";
import { Title } from "../add_employee/add-employee.style";
import { useEffect } from "react";
import { listAllowancesRequested } from "../../../store/allowance/allowance-slice";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_ALLOWANCE, ADD_ALLOWANCE_TO_EMP } from "../../../constants/tasks";
export const AddAllowanceToEmp = () => {
  const { allowances, curr_allowance } = useAllowance();
  const dispatcher = useAppDispatch();
  const employee = useEmployee();
  const { openModal } = useModal();
  useEffect(() => {
    if (curr_allowance) {
      dispatcher(listAllowancesRequested());
    }
  }, [curr_allowance, dispatcher]);
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      allowance_name: "",
      employee_id: employee.curr_emp?.id,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Modal content={ADD_ALLOWANCE_TO_EMP}>
      <AllowanceContainer>
        <AllowanceBody>
          <Title>Adding Allowance to {employee.curr_emp?.first_name}</Title>
          <AllowanceForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label htmlFor="role">Select Allowance</Label>
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
                  <SelectOption value="" disabled selected={!curr_allowance}>
                    Select Position
                  </SelectOption>
                  {allowances.map(
                    (allowance) =>
                      allowance && (
                        <SelectOption
                          selected={allowance.id === curr_allowance?.id}
                          value={allowance.allowance_name}
                          onChange={handleChange}
                        >
                          {allowance.allowance_name}
                        </SelectOption>
                      )
                  )}
                </Select>
                <AddBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal(ADD_ALLOWANCE);
                  }}
                  style={{ flex: 1.2 }}
                >
                  {"Add New"}
                </AddBtn>
              </div>
              <FormError>
                {touched.allowance_name && errors.allowance_name ? (
                  <div>{errors.allowance_name}</div>
                ) : null}
              </FormError>
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};
