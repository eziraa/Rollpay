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
  editPositionRequested,
  getPositionRequested,
  resetPositionState,
} from "../../../store/position/position-slice";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_POSITION } from "../../../constants/tasks";
import { AddPositionSchema } from "../../../schema/add-position-schema";
import { useEffect } from "react";
import { usePosition } from "../../../hooks/position-hook";
import { useNavigate, useParams } from "react-router-dom";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
export const AddPosition = () => {
  const dispatcher = useAppDispatch();
  const { task_error } = usePosition();
  const navigate = useNavigate();
  const position = usePosition();
  const { position_id } = useParams();

  useEffect(() => {
    position_id && dispatcher(getPositionRequested(position_id));
  }, [position_id]);
  useEffect(() => {
    if (position.curr_position && position_id) {
      setFieldValue("position_name", position.curr_position.position_name);
      setFieldValue("basic_salary", position.curr_position.basic_salary);
    }
  }, [position.curr_position]);
  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    dirty,
  } = useFormik({
    initialValues: {
      position_name: "",
      basic_salary: "",
    },
    validationSchema: AddPositionSchema,
    onSubmit(values) {
      if (dirty) {
        if (position_id) {
          dispatcher(editPositionRequested({ ...values, id: position_id }));
        } else dispatcher(addPositionRequested(values));
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
  useEffect(() => {
    if (isSubmitting && position.task_finished) {
      dispatcher(resetPositionState({ ...position, task_error: undefined }));
      navigate(-1);
    }
  }, [position.task_finished]);

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
                value={values.position_name}
              />
              {touched.position_name && errors.position_name && (
                <FormError> {errors.position_name} </FormError>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Base Salary</Label>
              <Input
                type="number"
                value={values.basic_salary.toString()}
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
                {" "}
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
