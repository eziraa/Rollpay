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
} from "../utils/add-item/add-item.style";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useEffect, useState } from "react";
import {
  addGroupRequest,
  getPermissionsRequest,
} from "../../../../store/admin/admin-slice";
import { Permission } from "../../../../typo/admin/response";
import { FormError } from "../../../utils/form-elements/form.style";

export const AddGroup = () => {
  const dispatcher = useAppDispatch();
  const { permissions, task_error } = useAdmin();
  const [selectedOptions, setSelectedOptions] = useState<Permission[]>([]);
  const [name, setName] = useState("");
  const permission = {
    all_permissions: permissions,
    selected_permissions: selectedOptions,
    selectHandler: setSelectedOptions,
  };

  useEffect(() => {
    dispatcher(getPermissionsRequest());
  }, []);

  return (
    <AddItemContainer>
      <AddItemTitle>Add Item</AddItemTitle>
      <AddItemForm>
        <InputContainer>
          <AddItemLabel>Name</AddItemLabel>
          <AddItemInput
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </InputContainer>
      </AddItemForm>
      <DisplayPermissions permission={permission} />
      <ActionContainer>
        <AddBtn
          onClick={(e) => {
            e.preventDefault();
            dispatcher(
              addGroupRequest({
                name: name,
                permissions: selectedOptions.map(
                  (permission) => permission.codename
                ), // Step 3: Pass selected permissions to the request action creator.
                onSuccess: () => {
                  alert("Success");
                },
                onError: () => {
                  alert("Error");
                  // Handle error if request fails
                },
              })
            );
          }}
        >
          Save
        </AddBtn>
        {task_error && <FormError> {task_error} </FormError>}
      </ActionContainer>
    </AddItemContainer>
  );
};
