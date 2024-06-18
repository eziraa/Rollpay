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
import { ADD_ALLOWANCE, ADD_DEDUCTION } from "../../../constants/tasks";
import { useAppSelector } from "../../../utils/custom-hook";
export const AddSalaryComponent = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Modal>
      <AllowanceContainer>
        <AllowanceBody>
          <Title>
            Add{" "}
            {user.short_task === ADD_ALLOWANCE
              ? "Allowance"
              : user.short_task === ADD_DEDUCTION
              ? "Deduction"
              : "Overtime"}
          </Title>
          <AllowanceForm>
            <InputContainer>
              <Label>
                {user.short_task === ADD_ALLOWANCE
                  ? "Allowance"
                  : user.short_task === ADD_DEDUCTION
                  ? "Deduction"
                  : "Overtime"}{" "}
                Name
              </Label>
              <Input type="text" />
            </InputContainer>
            <InputContainer>
              <Label>
                {user.short_task === ADD_ALLOWANCE
                  ? "Allowance"
                  : user.short_task === ADD_DEDUCTION
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
