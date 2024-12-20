import { AddBtn } from "../../../sections/add_employee/add-employee.style";
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
import { addRoleRequest, resetError } from "../../../../store/admin/admin-slice";
import { Group } from "../../../../typo/admin/response";
import { FormError } from "../../../utils/form-elements/form.style";
import AdminAPI from "../../../../services/admin-api";
import { useLoaderData } from "react-router-dom";
import { DisplayGroups } from "../utils/permisstion/group";
import { CircularProgress } from "@mui/material";

interface GroupsLoaderData {
  groups: Group[];
}

export const AddRole = () => {
  const dispatcher = useAppDispatch();
  const { task_error, adding } = useAdmin();
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);
  const [name, setName] = useState("");
  const { groups } = useLoaderData() as GroupsLoaderData;
  const [error, setError] = useState("");
  const group = {
    all_groups: groups || [],
    selectedGroups,
    selectHandler: setSelectedGroups,
  };
  useEffect(() => {
    dispatcher(resetError());
  }, [name]);
  return (
    <AddItemContainer>
      <AddItemTitle>Add New Role</AddItemTitle>
      <AddItemForm
        style={{
          width: "100%",
        }}
      >
        <InputContainer
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <AddItemLabel>Name</AddItemLabel>
          <AddItemInput
            type="text"
            value={name}
            onChange={(e) => {
              if (!e.target.value) {
                setError("Role name is required");
                setName("");
                return;
              } else {
                setError("");
              }
              setName(e.target.value);
            }}
          />
          {<FormError> {error} </FormError>}
        </InputContainer>
      </AddItemForm>
      <DisplayGroups group={group} />
      <ActionContainer>
        {adding ? (
          <CircularProgress size={20} />
        ) : (
          <AddBtn
            disabled={adding}
            onClick={(e) => {
              e.preventDefault();
              if (!name) {
                setError("Role name is required");
                return;
              } else {
                setError("");
              }
              dispatcher(
                addRoleRequest({
                  name: name,
                  groups: selectedGroups.map((group) => group.id), // Step 3: Pass selected groups to the request action creator.
                })
              );
            }}
          >
            Save
          </AddBtn>
        )}
        {task_error && <FormError> {task_error} </FormError>}
      </ActionContainer>
    </AddItemContainer>
  );
};

export const loader = async () => {
  const groupsResponse = await AdminAPI.getGroups();
  if ("groups" in groupsResponse) {
    const { groups } = groupsResponse;
    return {
      groups,
    };
  } else {
    throw new Error("Failed to fetch groups");
  }
};
