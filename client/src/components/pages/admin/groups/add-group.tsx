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
import { useState } from "react";
import { addGroupRequest } from "../../../../store/admin/admin-slice";
import { Permission } from "../../../../typo/admin/response";
import { FormError } from "../../../utils/form-elements/form.style";
import AdminAPI from "../../../../services/admin-api";
import { useLoaderData } from "react-router-dom";

interface PermissionsLoaderData {
  permissions: Permission[];
}

export const AddGroup = () => {
  const dispatcher = useAppDispatch();
  const { task_error } = useAdmin();
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const [name, setName] = useState("");
  const { permissions } = useLoaderData() as PermissionsLoaderData;
  const permission = {
    all_permissions: permissions || [],
    selectedPermissions,
    selectHandler: setSelectedPermissions,
  };

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
                permissions: selectedPermissions.map(
                  (permission) => permission.codename
                ), // Step 3: Pass selected permissions to the request action creator.
                onSuccess: () => {},
                onError: () => {
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

export const loader = async () => {
  const permissionsResponse = await AdminAPI.getPermissions();
  if ("permissions" in permissionsResponse) {
    const { permissions } = permissionsResponse;
    return {
      permissions,
    };
  } else {
    throw new Error("Failed to fetch permissions");
  }
};