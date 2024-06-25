import { ADD_OVERTIME } from "../../../constants/tasks";
import {
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import { Title } from "../add_employee/add-employee.style";
import {
  AddBtn,
  OvertimeBody,
  OvertimeContainer,
  OvertimeForm,
} from "./add-overtime.style";
export const AddOvertime = () => {
  return (
    <Modal content={ADD_OVERTIME}>
      <OvertimeContainer>
        <OvertimeBody>
          <Title>Add Overtime</Title>
          <OvertimeForm>
            <InputContainer>
              <Label>Overtime Name</Label>
              <Input type="text" />
            </InputContainer>
            <InputContainer>
              <Label>Overtime rate</Label>
              <Input type="text" />
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </OvertimeForm>
        </OvertimeBody>
      </OvertimeContainer>
    </Modal>
  );
};
