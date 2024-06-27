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
  OvertimeBody,
  OvertimeContainer,
  OvertimeForm,
} from "../add-overtime/add-overtime.style";
import { Title } from "../add_employee/add-employee.style";
import { useEffect } from "react";
import { listOvertimesRequested } from "../../../store/overtime/overtime-slice";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_OVERTIME, ADD_OVERTIME_TO_EMP } from "../../../constants/tasks";
import { useOvertime } from "../../../hooks/overtime-hook";
export const AddOvertimeToEmp = () => {
  const { overtimes, curr_overtime } = useOvertime();
  const dispatcher = useAppDispatch();
  const employee = useEmployee();
  const { openModal } = useModal();
  useEffect(() => {
    if (curr_overtime) {
      dispatcher(listOvertimesRequested());
    }
  }, [curr_overtime, dispatcher]);
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      overtime_name: "",
      employee_id: employee.curr_emp?.id,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Modal content={ADD_OVERTIME_TO_EMP}>
      <OvertimeContainer>
        <OvertimeBody>
          <Title>Adding Overtime to {employee.curr_emp?.first_name}</Title>
          <OvertimeForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label htmlFor="role">Select Overtime</Label>
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
                  <SelectOption value="" disabled selected={!curr_overtime}>
                    Select Overtime
                  </SelectOption>
                  {overtimes.map(
                    (overtime) =>
                      overtime && (
                        <SelectOption
                          selected={overtime.id === curr_overtime?.id}
                          value={overtime.overtime_name}
                          onChange={handleChange}
                        >
                          {overtime.overtime_name}
                        </SelectOption>
                      )
                  )}
                </Select>
                <AddBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal(ADD_OVERTIME);
                  }}
                  style={{ flex: 1.2 }}
                >
                  {"Add New"}
                </AddBtn>
              </div>
              <FormError>
                {touched.overtime_name && errors.overtime_name ? (
                  <div>{errors.overtime_name}</div>
                ) : null}
              </FormError>
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </OvertimeForm>
        </OvertimeBody>
      </OvertimeContainer>
    </Modal>
  );
};
