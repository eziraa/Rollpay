import {
  Input,
  InputContainer,
  Label,
} from "../../utils/form_elements/form.style";
import { Modal } from "../../utils/modal/modal";
import {
  AddEmployeeContainer,
  AddEmployeeForm,
  Column,
  GenderContainer,
} from "./add-employee.style";

export const AddEmployee = () => {
  return (
    <Modal>
      <AddEmployeeContainer>
        <AddEmployeeForm>
          <Column>
            <InputContainer>
              <Label htmlFor="first_name">First Name</Label>
              <Input type="text" name="first_name" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="last_name">Last Name</Label>
              <Input type="text" name="last_name" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input type="text" name="phone_number" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">Email</Label>
              <Input type="text" name="email" />
            </InputContainer>
            <GenderContainer>
              <Label htmlFor="gender">Male</Label>
              <input type="radio" name="gender" id="" value="male" />
              <Label htmlFor="gender">Female</Label>
              <input type="radio" name="gender" id="" value="female" />
            </GenderContainer>
          </Column>
          <Column>
            <InputContainer>
              <Label htmlFor="role">Role(Position)</Label>
              <Input type="text" name="role" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_birth">Birth Date</Label>
              <Input type="date" name="date_of_birth" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="date_of_hire">Date of Hire</Label>
              <Input type="date" name="date_of_hire" />
            </InputContainer>
          </Column>
        </AddEmployeeForm>
      </AddEmployeeContainer>
    </Modal>
  );
};
