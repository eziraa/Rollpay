/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { useFormik } from "formik";
import { AddEmployeeSchema } from "../../../schema/add-emp-schema";
import { ErrorMessage } from "../sign-up/sign-up.style";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { useEffect } from "react";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useEmployee } from "../../../hooks/employee-hook";
import { listPositionsRequested } from "../../../store/position/position-slice";
import { usePosition } from "../../../hooks/position-hook";

export const EditEmployee = () => {
  const { curr_emp, task_finished } = useEmployee();
  const employee = useEmployee();

  const dispatcher = useAppDispatch();

  const initialValues = {
    id: curr_emp?.id ?? "",
    first_name: curr_emp?.first_name ?? "",
    last_name: curr_emp?.last_name ?? "",
    gender: curr_emp?.gender ?? "",
    email: curr_emp?.email ?? "",
    position: curr_emp?.position ?? "",
    phone_number: curr_emp?.phone_number ?? "",
    date_of_birth: curr_emp?.date_of_birth ?? "",
    date_of_hire: curr_emp?.date_of_hire ?? "",
    salary: curr_emp?.salary ?? 0, // Default to 0 if salary is undefined
  };
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

  useEffect(() => {
    resetForm({
      values: initialValues,
    });
  }, [curr_emp]);
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
            <Select style={{ flex: 2 }} name="position" onChange={handleChange}>
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
            {!task_finished ? <SmallSpinner /> : "Save"}
          </SaveBtn>
        </ButtonContainer>
      </EditEmployeeBody>
    </Form>
  );
};
