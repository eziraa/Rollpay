/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import {
  FormError,
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import { Title } from "../add_employee/add-employee.style";
import {
  AddBtn,
  PositionBody,
  PositionContainer,
  PositionForm,
} from "./add-position.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  addPositionRequested,
  closePositionTask,
  getPositionRequest,
  resetPositionState,
} from "../../../store/position/position-slice";
import { AddPositionSchema } from "../../../schema/add-position-schema";
import { useEffect, useState } from "react";
import { usePosition } from "../../../hooks/position-hook";
import { useNavigate, useParams } from "react-router-dom";
export const AddPosition = () => {
  // Calling hooks and getting necessary information
  const dispatcher = useAppDispatch();
  const { task_error, task_finished } = usePosition();
  const position = usePosition();
  const navigate = useNavigate();
  const { position_id } = useParams();

  const [initial, _] = useState({
    position_name: position.curr_position?.position_name as string,
    basic_salary: (position.curr_position?.basic_salary || "") as string,
  });

  //Getting current position

  useEffect(() => {
    position_id && dispatcher(getPositionRequest(position_id));
  }, [position_id]);

  // Creating formik instance
  const { touched, errors, values, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: initial,
      validationSchema: AddPositionSchema,
      onSubmit: (values) => {
        dispatcher(
          resetPositionState({
            ...position,
            task_error: undefined,
            task_finished: false,
          })
        );
        dispatcher(addPositionRequested(values));
      },
    });

  //Defining hook to close the modal
  useEffect(() => {
    if (isSubmitting && task_finished) {
      dispatcher(
        resetPositionState({
          ...position,
          task_error: undefined,
          task_finished: true,
        })
      );
      navigate(-1);
    }
  }, [task_finished]);

  const clearAction = () => {
    dispatcher(closePositionTask());
  };
  return (
    <Modal closeAction={clearAction}>
      <PositionContainer>
        <PositionBody>
          <Title>{position_id ? "Edit" : "Add"} Position</Title>
          <PositionForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label>Position Name</Label>
              <Input
                type="text"
                onChange={handleChange}
                name="position_name"
                value={initial.position_name || values.position_name}
              />
              {touched.position_name && errors.position_name && (
                <FormError> {errors.position_name} </FormError>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Base Salary</Label>
              <Input
                type="number"
                value={initial.basic_salary || values.basic_salary}
                name="basic_salary"
                onChange={handleChange}
              />
              {touched.basic_salary && errors.basic_salary && (
                <FormError> {errors.basic_salary} </FormError>
              )}
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
            <AddBtn type="submit">{position_id ? "Edit" : "Add"}</AddBtn>
          </PositionForm>
        </PositionBody>
      </PositionContainer>
    </Modal>
  );
};
