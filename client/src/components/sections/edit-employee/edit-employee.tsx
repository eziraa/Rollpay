/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Form } from "../../utils/form-elements/form.style";
import { Label, EditEmployeeBody, Field, SaveBtn } from "./edit-employee.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";

import { editEmployeeRequested } from "../../../store/employee/employee-slice";
import { useFormik } from "formik";
import { AddEmployeeSchema } from "../../../schema/add-emp-schema";
import { ErrorMessage } from "../../pages/sign-up/sign-up.style";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { useEffect } from "react";
import { SmallSpinner } from "../../utils/spinner/spinner";

export const EditEmployee = () => {
  const { curr_emp: current_employee, editing } = useAppSelector(
    (state) => state.employee
  );
  const dispatcher = useAppDispatch();

  const initialValues = {
    id: current_employee?.id ?? "",
    first_name: current_employee?.first_name ?? "",
    last_name: current_employee?.last_name ?? "",
    gender: current_employee?.gender ?? "",
    email: current_employee?.email ?? "",
    position: current_employee?.position ?? "",
    phone_number: current_employee?.phone_number ?? "",
    date_of_birth: current_employee?.date_of_birth ?? "",
    date_of_hire: current_employee?.date_of_hire ?? "",
    salary: current_employee?.salary ?? 0, // Default to 0 if salary is undefined
  };

  useEffect(() => {
    resetForm({ values: current_employee });
  }, [current_employee]);
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
    <Form onSubmit={handleSubmit}>
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
          <Label>Role</Label>
          <Input
            type="text"
            name="position"
            required
            value={values.position}
            onChange={handleChange}
          />
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
        <SaveBtn
          style={{
            alignSelf: "center",
          }}
          type="submit"
        >
          {editing ? <SmallSpinner /> : "Save"}
        </SaveBtn>
      </EditEmployeeBody>
    </Form>
  );
};
