/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  AddButton,
  AddEmployeeContainer,
  AddEmployeeForm,
  Column,
  GenderContainer,
  Title,
} from "./add-employee.style";
import { useFormik } from "formik";
import { AddEmployeeSchema } from "../../../schema/add-emp-schema";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  addEmpRequested,
  closeEmployeeTask,
  resetEmployeeState,
} from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useEffect, useRef } from "react";
import { listPositionsRequested } from "../../../store/position/position-slice";
import { useEmployee } from "../../../hooks/employee-hook";
import { usePosition } from "../../../hooks/position-hook";
import { Outlet, useNavigate } from "react-router";

export const AddEmployee = () => {
  const dispatcher = useAppDispatch();
  const employee = useEmployee();
  const { task_finished, task_error } = useEmployee();
  const navigate = useNavigate();
  const { positions, curr_position } = usePosition();

  useEffect(() => {
    dispatcher(listPositionsRequested());
    dispatcher(
      resetEmployeeState({
        ...employee,
        curr_emp: undefined,
        task_error: undefined,
      })
    );
  }, []);
  useEffect(() => {
    if (curr_position) {
      dispatcher(listPositionsRequested());
    }
  }, [curr_position, dispatcher]);
  const formHandler = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "M",
      date_of_birth: "",
      date_of_hire: "",
      position: curr_position?.position_name || "",
    },
    validationSchema: AddEmployeeSchema,
    onSubmit: (values, _) => {
      dispatcher(
        resetEmployeeState({
          ...employee,
          task_error: undefined,
          task_finished: false,
        })
      );
      dispatcher(addEmpRequested(values));
    },
  });

  useEffect(() => {
    !task_error &&
      task_finished &&
      formHandler.isSubmitting &&
      navigate("/employees/upload-document");
  }, [task_finished]);

  const clearTask = () => {
    dispatcher(closeEmployeeTask());
  };
  return (
    <Modal closeAction={clearTask}>
      <AddEmployeeContainer>
        <Outlet />
        <Title>Add Employee</Title>
        <AddEmployeeForm
          onSubmit={(e) => {
            e.preventDefault();
            formHandler.handleSubmit(e);
          }}
        >
          <Column>
            <InputContainer>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                placeholder=""
                type="text"
                id="first_name"
                name="first_name"
                value={formHandler.values.first_name}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.first_name &&
                formHandler.errors.first_name ? (
                  <div>{formHandler.errors.first_name}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                placeholder=""
                type="text"
                id="last_name"
                name="last_name"
                value={formHandler.values.last_name}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.last_name &&
                formHandler.errors.last_name ? (
                  <div>{formHandler.errors.last_name}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                placeholder=""
                type="text"
                id="phone_number"
                name="phone_number"
                value={formHandler.values.phone_number}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.phone_number &&
                formHandler.errors.phone_number ? (
                  <div>{formHandler.errors.phone_number}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder=""
                type="text"
                id="email"
                name="email"
                value={formHandler.values.email}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.email && formHandler.errors.email ? (
                  <div>{formHandler.errors.email}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <GenderContainer>
              <Label htmlFor="gender">Male</Label>
              <input
                type="radio"
                name="gender"
                id=""
                value="M"
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                checked={formHandler.values.gender === "M"}
              />
              <Label htmlFor="gender">Female</Label>
              <input
                type="radio"
                name="gender"
                id=""
                value="F"
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                checked={formHandler.values.gender === "F"}
              />
              <FormError>
                {formHandler.touched.gender && formHandler.errors.gender ? (
                  <div>{formHandler.errors.gender}</div>
                ) : null}
              </FormError>{" "}
            </GenderContainer>
          </Column>
          <Column>
            <InputContainer>
              <Label htmlFor="role">Role(Position)</Label>
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
                  style={{ flex: 2 }}
                  name="position"
                  onChange={formHandler.handleChange}
                >
                  <SelectOption value="" disabled selected={!curr_position}>
                    Select Position
                  </SelectOption>
                  {positions.map(
                    (position) =>
                      position && (
                        <SelectOption
                          selected={position.id === curr_position?.id}
                          value={position.position_name}
                        >
                          {position.position_name}
                        </SelectOption>
                      )
                  )}
                </Select>
                <AddBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("add-position");
                  }}
                  style={{ flex: 1.2 }}
                >
                  {"Add New"}
                </AddBtn>
              </div>
              <FormError>
                {formHandler.touched.position && formHandler.errors.position ? (
                  <div>{formHandler.errors.position}</div>
                ) : null}
              </FormError>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_birth">Birth Date</Label>
              <Input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formHandler.values.date_of_birth}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.date_of_birth &&
                formHandler.errors.date_of_birth ? (
                  <div>{formHandler.errors.date_of_birth}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_hire">Date of Hire</Label>
              <Input
                type="date"
                id="date_of_hire"
                name="date_of_hire"
                value={formHandler.values.date_of_hire}
                onChange={formHandler.handleChange}
              />
              <FormError>
                {formHandler.touched.date_of_hire &&
                formHandler.errors.date_of_hire ? (
                  <div>{formHandler.errors.date_of_hire}</div>
                ) : null}
              </FormError>{" "}
            </InputContainer>

            {task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {task_error}
              </FormError>
            )}
          </Column>
          <AddButton type="submit">
            {!task_finished && task_error ? <SmallSpinner /> : "Add"}
          </AddButton>
        </AddEmployeeForm>
      </AddEmployeeContainer>
    </Modal>
  );
};
