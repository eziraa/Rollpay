/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useFormik } from "formik";
import {
  Input,
  Form,
  Select,
  SelectOption,
} from "../../utils/form-elements/form.style";
import {
  Label,
  EditEmployeeBody,
  Field,
  SaveBtn,
  ButtonContainer,
  CancelBtn,
} from "./edit-employee.style";
import { useAppDispatch } from "../../../utils/custom-hook";

import {
  editEmployeeRequested,
  resetEmployeeState,
} from "../../../store/employee/employee-slice";
import { AddEmployeeSchema } from "../../../schema/add-emp-schema";
import { ErrorMessage } from "../sign-up/sign-up.style";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useEmployee } from "../../../hooks/employee-hook";
import { Position } from "../../../typo/position/response";
import { Employee } from "../../../typo/employee/response";

interface DataLoader {
  positions: Position[];
  employee: Employee;
}
export const EditEmployee = () => {
  const { employee, positions } = useLoaderData() as DataLoader;
  const dispatcher = useAppDispatch();
  const empState = useEmployee();
  const initialValues = {
    id: employee?.id,
    first_name: employee?.first_name,
    last_name: employee?.last_name,
    gender: employee?.gender,
    email: employee?.email,
    position: employee?.position,
    phone_number: employee?.phone_number,
    date_of_birth: employee?.date_of_birth,
    date_of_hire: employee?.date_of_hire,
    salary: employee?.salary ?? 0, // Default to 0 if salary is undefined
  };

  useEffect(() => {
    dispatcher(
      resetEmployeeState({
        ...empState,
        curr_emp: undefined,
        task_error: undefined,
      })
    );
  }, []);

  const {
    resetForm,
    dirty,
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddEmployeeSchema,
    onSubmit: (values) => {
      if (dirty) {
        dispatcher(editEmployeeRequested(values));
      } else {
        dispatcher(
          setFlashMessage({
            desc: "No changes to save",
            title: "No changes made",
            status: true,
            duration: 3,
            type: "error",
          })
        );
      }
    },
  });
  return (
    <Form
      style={{
        position: "relative",
      }}
      onSubmit={handleSubmit}
    >
      <EditEmployeeBody>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>First Name</Label>
          <Input
            type="text"
            name="first_name"
            required
            value={values.first_name}
            onChange={handleChange}
          />
          {touched.first_name && errors.first_name && (
            <ErrorMessage>{errors.first_name}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Last Name</Label>
          <Input
            type="text"
            name="last_name"
            required
            value={values.last_name}
            onChange={handleChange}
          />
          {touched.last_name && errors.last_name && (
            <ErrorMessage>{errors.last_name}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Gender</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              justifyContent: "start",
            }}
          >
            <Label>Male</Label>
            <input
              type="radio"
              name="gender"
              id=""
              value="M"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.gender === "M"}
            />
            <Label>Female</Label>
            <input
              type="radio"
              name="gender"
              id=""
              value="F"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.gender === "F"}
            />
          </div>
          {touched.gender && errors.gender && (
            <ErrorMessage>{errors.gender}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Email</Label>
          <Input
            type="text"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && (
            <ErrorMessage>{errors.email}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phone_number"
            required
            value={values.phone_number}
            onChange={handleChange}
          />
          {touched.phone_number && errors.phone_number && (
            <ErrorMessage>{errors.phone_number}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Position</Label>
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
              defaultValue={employee.position}
              onChange={handleChange}
            >
              {positions.map(
                (position) =>
                  position && (
                    <SelectOption value={position.position_name}>
                      {position.position_name}
                    </SelectOption>
                  )
              )}
            </Select>
          </div>
          {touched.position && errors.position && (
            <ErrorMessage>{errors.position}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Birth Date</Label>
          <Input
            type="date"
            name="date_of_birth"
            required
            value={values.date_of_birth}
            onChange={handleChange}
          />
          {touched.date_of_birth && errors.date_of_birth && (
            <ErrorMessage>{errors.date_of_birth}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Date of Hire</Label>
          <Input
            type="date"
            name="salary"
            required
            value={values.date_of_hire}
            onChange={handleChange}
          />
          {touched.date_of_hire && errors.date_of_hire && (
            <ErrorMessage>{errors.date_of_hire}</ErrorMessage>
          )}
        </Field>
        <Field
          style={{
            gap: "3rem",
          }}
        >
          <Label>Salary</Label>
          <Input
            type="text"
            name="salary"
            required
            value={values.salary}
            onChange={handleChange}
          />
          {touched.salary && errors.salary && (
            <ErrorMessage>{errors.salary}</ErrorMessage>
          )}
        </Field>
        <ButtonContainer>
          <CancelBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (dirty) {
                resetForm({ values: initialValues });
                dispatcher(
                  setFlashMessage({
                    desc: "Form reset successfully",
                    title: "Resetting form",
                    status: true,
                    duration: 3,
                    type: "success",
                  })
                );
              } else
                dispatcher(
                  setFlashMessage({
                    desc: "No changes to reset",
                    title: "No changes made",
                    status: true,
                    duration: 3,
                    type: "error",
                  })
                );
            }}
          >
            {"Reset"}
          </CancelBtn>
          <SaveBtn type="submit">
            {!empState.task_finished ? <SmallSpinner /> : "Save"}
          </SaveBtn>
        </ButtonContainer>
      </EditEmployeeBody>
    </Form>
  );
};
