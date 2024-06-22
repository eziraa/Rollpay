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
} from "./style";
import { useContext } from "react";
import { DisplayContext } from "../../../contexts/display-context";
export const AddSalaryComponent = () => {
  const { display } = useContext(DisplayContext);
  return (
    <Modal>
      <AllowanceContainer>
        <AllowanceBody>
          <Title>
            Add{" "}
            {display.add_allowance
              ? "Allowance"
              : display.add_deduction
              ? "Deduction"
              : "Overtime"}
          </Title>
          <AllowanceForm>
            <InputContainer>
              <Label>
                {display.add_allowance
                  ? "Allowance"
                  : display.add_deduction
                  ? "Deduction"
                  : "Overtime"}{" "}
                Name
              </Label>
              <Input type="text" />
            </InputContainer>
            <InputContainer>
              <Label>
                {display.add_allowance
                  ? "Allowance"
                  : display.add_deduction
                  ? "Deduction"
                  : "Overtime"}{" "}
                Value
              </Label>
              <Input type="text" />
            </InputContainer>
            <AddBtn>Add</AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};
