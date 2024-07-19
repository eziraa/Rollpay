import {
  AddBtn,
  GenderContainer,
} from "../../../sections/add_employee/add-employee.style";
import {
  ActionContainer,
  AddItemContainer,
  AddItemForm,
  AddItemInput,
  AddItemTitle,
  InputContainer,
  AddItemLabel,
} from "../utils/add-item/add-item.style";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useEffect } from "react";
import {
  FormError,
  Select,
  SelectOption,
} from "../../../utils/form-elements/form.style";
import { useFormik } from "formik";
import { ErrorMessage } from "../../sign-up/sign-up.style";
import { useEmployee } from "../../../../hooks/employee-hook";
import { useNavigate } from "react-router";
import { usePosition } from "../../../../hooks/position-hook";
import { listPositionsRequested } from "../../../../store/position/position-slice";
import {
  addEmpRequested,
  resetEmployeeState,
} from "../../../../store/employee/employee-slice";
import { AddEmployeeSchema } from "../../../../schema/add-emp-schema";

export const AddEmployeeSection = () => {
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
    onSubmit: (values) => {
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
    !task_error && task_finished && formHandler.isSubmitting && navigate(-1);
  }, [task_finished]);

  return (
    <AddItemContainer>
      <AddItemTitle>Add User </AddItemTitle>
      <AddItemForm
        style={{
          width: "100%",
        }}
        onSubmit={formHandler.handleSubmit}
      >
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="first_name">First Name</AddItemLabel>
          <AddItemInput
            placeholder=""
            type="text"
            id="first_name"
            name="first_name"
            value={formHandler.values.first_name}
            onChange={formHandler.handleChange}
          />
          <FormError>
            {formHandler.touched.first_name && formHandler.errors.first_name ? (
              <div>{formHandler.errors.first_name}</div>
            ) : null}
          </FormError>{" "}
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="last_name">Last Name</AddItemLabel>
          <AddItemInput
            placeholder=""
            type="text"
            id="last_name"
            name="last_name"
            value={formHandler.values.last_name}
            onChange={formHandler.handleChange}
          />
          <FormError>
            {formHandler.touched.last_name && formHandler.errors.last_name ? (
              <div>{formHandler.errors.last_name}</div>
            ) : null}
          </FormError>{" "}
        </InputContainer>
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="phone_number">Phone Number</AddItemLabel>
          <AddItemInput
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
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="email">Email</AddItemLabel>
          <AddItemInput
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
          <AddItemLabel htmlFor="gender">Male</AddItemLabel>
          <input
            type="radio"
            name="gender"
            id=""
            value="M"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            checked={formHandler.values.gender === "M"}
          />
          <AddItemLabel htmlFor="gender">Female</AddItemLabel>
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
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="role">Role(Position)</AddItemLabel>
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
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="date_of_birth">Birth Date</AddItemLabel>
          <AddItemInput
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
        <InputContainer
          style={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1fr 1fr 1fr",
          }}
        >
          <AddItemLabel htmlFor="date_of_hire">Date of Hire</AddItemLabel>
          <AddItemInput
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

        {task_error && <ErrorMessage>{task_error}</ErrorMessage>}
        <ActionContainer>
          <AddBtn type="submit">Save</AddBtn>
          {task_error && <FormError> {task_error} </FormError>}
        </ActionContainer>
      </AddItemForm>
    </AddItemContainer>
  );
};
