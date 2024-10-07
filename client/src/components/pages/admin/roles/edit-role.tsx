import { AddBtn } from "../../../sections/add_employee/add-employee.style";
import { DisplayGroups } from "../utils/permisstion/group";
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
import { editRoleRequest } from "../../../../store/admin/admin-slice";
import { Role, Group } from "../../../../typo/admin/response";
import { FormError } from "../../../utils/form-elements/form.style";
import AdminAPI from "../../../../services/admin-api";
import { useLoaderData } from "react-router-dom";

interface RoleLoaderData {
  role: Role;
  groups: Group[];
}

export const EditRole = () => {
  const dispatcher = useAppDispatch();
  const { task_error } = useAdmin();
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);
  const [name, setName] = useState("");
  const { role, groups } = useLoaderData() as RoleLoaderData;
  const group = {
    all_groups: groups || [],
    selectedGroups,
    selectHandler: setSelectedGroups,
  };
  useEffect(() => {
    if (role) {
      setName(role.name);
      setSelectedGroups([...role.groups]);
    }
  }, [role]);

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
      <DisplayGroups group={group} />
      <ActionContainer>
        <AddBtn
          onClick={(e) => {
            e.preventDefault();
            if (role)
              dispatcher(
                editRoleRequest({
                  id: role.id,
                  name: name,
                  groups: selectedGroups.map((group) => group.id),
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

export const loader = async ({ params }: { params: { role_id: string } }) => {
  const { role_id } = params;
  return await AdminAPI.getRoles(role_id).then(async (response) => {
    if ("roles" in response) {
      const { roles } = response;
      const groupsResponse = await AdminAPI.getGroups();
      if ("groups" in groupsResponse) {
        const { groups } = groupsResponse;
        return {
          role: roles,
          groups,
        };
      } else {
        throw new Error("Failed to fetch groups");
      }
    } else {
      throw new Error("Failed to fetch roles");
    }
  });
};
