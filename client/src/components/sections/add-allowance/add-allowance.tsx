import { ADD_ALLOWANCE } from "../../../constants/tasks";
import {
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import { Title } from "../add_employee/add-employee.style";
import {
  AddBtn,
  AllowanceBody,
  AllowanceContainer,
  AllowanceForm,
} from "./add-allowance.style";
export const AddAllowance = () => {
  return (
    <Modal content={ADD_ALLOWANCE}>
      <AllowanceContainer>
        <AllowanceBody>
          <Title>Add Allowance</Title>
          <AllowanceForm>
            <InputContainer>
              <Label>Allowance Name</Label>
              <Input type="text" />
            </InputContainer>
            <InputContainer>
              <Label>Allowance rate</Label>
              <Input type="text" />
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};
