import {
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import { Title } from "../add_employee/add-employee.style";
import {
  AddBtn,
  DeductionBody,
  DeductionContainer,
  DeductionForm,
} from "./add-deduction.style";
export const AddDeduction = () => {
  return (
    <Modal>
      <DeductionContainer>
        <DeductionBody>
          <Title>Add Deduction</Title>
          <DeductionForm>
            <InputContainer>
              <Label>Deduction Name</Label>
              <Input type="text" />
            </InputContainer>
            <InputContainer>
              <Label>Deduction rate</Label>
              <Input type="text" />
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </DeductionForm>
        </DeductionBody>
      </DeductionContainer>
    </Modal>
  );
};
