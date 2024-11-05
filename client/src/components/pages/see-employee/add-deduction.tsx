/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useDeduction } from "../../../hooks/deduction-hook";
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
} from "../../sections/add-deduction/add-deduction.style";
import { Title } from "../../sections/add_employee/add-employee.style";
import { useEffect, useState } from "react";
import { listDeductionsRequested } from "../../../store/deduction/deduction-slice";
import {
  addEmpDeductionRequested,
  closeEmployeeTask,
  resetEmployeeState,
} from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router";
import { useEmployee } from "../../../hooks/employee-hook";
import { useSalary } from "../../../hooks/salary-hook";
import api from "../../../config/api";
import { Deduction } from "../../../typo/deduction/response";
interface DeductionsLoader {
  deductions: Deduction[];
}

export const AddDeductionToEmp = () => {
  const { curr_deduction } = useDeduction();
  const { deductions } = useLoaderData() as DeductionsLoader;
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { year, month, employee_id } = useParams();
  const employee = useEmployee();
  const { curr_emp } = useSalary();
  useEffect(() => {
    if (curr_deduction) {
      dispatcher(listDeductionsRequested());
    }
  }, [curr_deduction, dispatcher]);
  const [submitting, setSubmitting] = useState(false);
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      deduction_type: "",
      employee_id: employee_id || "",
      query_string: `?year=${year}&month=${month}`,
    },

    onSubmit: (values) => {
      setSubmitting(true);
      dispatcher(
        resetEmployeeState({
          ...employee,
          task_error: undefined,
        })
      );
      dispatcher(addEmpDeductionRequested(values));
    },
  });
  useEffect(() => {
    if (!submitting) return;
    if (employee.task_finished && !employee.task_error) {
      navigate(-1);
    }
  }, [employee.task_error]);
  // Fetching list of deductions to able to add deduction to employee

  useEffect(() => {
    dispatcher(listDeductionsRequested());
  }, []);

  //Adding a method to close modal  properly
  const clearTask = () => {
    dispatcher(closeEmployeeTask());
  };
  return (
    <Modal closeAction={clearTask}>
      <DeductionContainer>
        <Outlet />
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
                    navigate("add-new-deduction");
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
            {employee.task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {employee.task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!employee.task_finished && !employee.task_error ? (
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

export const loader = async () => {
  const deductions = await api
    .get("/deduction/list?is_active=True")
    .then((response) => {
      return response.data;
    });

  return { deductions };
};