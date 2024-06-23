import {
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
export const AddPosition = () => {
  return (
    <Modal>
      <PositionContainer>
        <PositionBody>
          <Title>Add Position</Title>
          <PositionForm>
            <InputContainer>
              <Label>Position Name Name</Label>
              <Input type="text" />
            </InputContainer>
            <InputContainer>
              <Label>Base Salary</Label>
              <Input type="number" />
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </PositionForm>
        </PositionBody>
      </PositionContainer>
    </Modal>
  );
};
