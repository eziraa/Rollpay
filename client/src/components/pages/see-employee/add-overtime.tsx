/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useOvertime } from "../../../hooks/overtime-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  FormError,
  Input,
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
} from "../../sections/add-overtime/add-overtime.style";
import { Title } from "../../sections/add_employee/add-employee.style";
import { useEffect } from "react";
import { listOvertimesRequested } from "../../../store/overtime/overtime-slice";
import { ADD_OVERTIME_TO_EMP } from "../../../constants/tasks";
import { addEmpOvertimeRequested } from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useSalary } from "../../../hooks/salary-hook";
import { useEmployee } from "../../../hooks/employee-hook";
import { Outlet, useNavigate } from "react-router";
export const AddOvertimeToEmp = () => {
  const { overtimes, curr_overtime } = useOvertime();
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { curr_emp } = useSalary();
  const { adding_emp_error, task_finished } = useEmployee();
  useEffect(() => {
    if (curr_overtime) {
      dispatcher(listOvertimesRequested());
    }
  }, [curr_overtime, dispatcher]);
  const { errors, touched, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      overtime_type: "",
      employee_id: curr_emp?.employee?.id || "",
      start_time: "",
      end_time: "",
    },
    onSubmit(values) {
      dispatcher(addEmpOvertimeRequested(values));
    },
  });

  useEffect(() => {
    dispatcher(listOvertimesRequested());
  }, []);
  return (
    <Modal content={ADD_OVERTIME_TO_EMP}>
      <Outlet />
      <OvertimeContainer>
        <OvertimeBody>
          <Title>Adding Overtime to {curr_emp?.employee?.first_name}</Title>
          <OvertimeForm
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label htmlFor="ovetime_type">Select Overtime</Label>
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
                  name="overtime_type"
                  style={{ flex: 2 }}
                  onChange={handleChange}
                >
                  <SelectOption value="" disabled selected={!curr_overtime}>
                    Select Overtime
                  </SelectOption>
                  {overtimes.map(
                    (overtime) =>
                      overtime && (
                        <SelectOption
                          selected={overtime.id === curr_overtime?.id}
                          value={overtime.overtime_type}
                          key={overtime.id}
                        >
                          {overtime.overtime_type}
                        </SelectOption>
                      )
                  )}
                </Select>
                <AddBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("add-new-overtime");
                  }}
                  style={{ flex: 1.2 }}
                >
                  {"Add New"}
                </AddBtn>
              </div>
              <FormError>
                {touched.overtime_type && !values.overtime_type ? (
                  <div>{errors.overtime_type}</div>
                ) : null}
              </FormError>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                type="datetime-local"
                name="start_time"
                value={values.start_time}
                onChange={handleChange}
                style={{ flex: 2 }}
              />
            </InputContainer>
            <FormError>
              {touched.start_time && errors.start_time ? (
                <div>{errors.start_time}</div>
              ) : null}
            </FormError>
            <InputContainer>
              <Label htmlFor="start_time">End Time</Label>
              <Input
                type="datetime-local"
                name="end_time"
                onChange={handleChange}
                value={values.end_time}
                style={{ flex: 2 }}
              />
            </InputContainer>
            <FormError>
              {touched.end_time && errors.end_time ? (
                <div>{errors.end_time}</div>
              ) : null}
            </FormError>
            {adding_emp_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {" "}
                {adding_emp_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!task_finished && !adding_emp_error ? <SmallSpinner /> : "Add"}
            </AddBtn>
          </OvertimeForm>
        </OvertimeBody>
      </OvertimeContainer>
    </Modal>
  );
};
