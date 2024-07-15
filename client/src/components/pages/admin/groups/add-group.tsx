import { AddBtn } from "../../../sections/add_employee/add-employee.style";
import { DisplayPermissions } from "../utils/permisstion/permission";
import {
  ActionContainer,
  AddItemContainer,
  AddItemForm,
  AddItemInput,
  AddItemLabel,
  AddItemTitle,
  InputContainer,
} from "../add-item/add-item.style";

export const AddGroup = () => {
  return (
    <AddItemContainer>
      <AddItemTitle>Add Item</AddItemTitle>
      <AddItemForm>
        <InputContainer>
          <AddItemLabel>Name</AddItemLabel>
          <AddItemInput type="text" />
        </InputContainer>
      </AddItemForm>
      <DisplayPermissions />
      <ActionContainer>
        <AddBtn>Save</AddBtn>
      </ActionContainer>
    </AddItemContainer>
  );
};
