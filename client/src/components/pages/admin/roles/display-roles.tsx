// export const CustomTable =

import { useEffect, useState } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import {
  deleteRoleRequest,
  getRolesRequest,
} from "../../../../store/admin/admin-slice";
import { ThreeDots } from "../../../utils/loading/dots";
import { NoResult } from "../../../utils/containers/containers.style";
import { CustomTable } from "../utils/custom-table/custom-table.style";
import {
  ActionButton,
  ActionContainer,
  ItemBody,
  ItemContainer,
  ItemHeader,
  ItemInput,
  ItemTitle,
  SearchButton,
  SearchContainer,
} from "../utils/model/item.style";
import { AddBtn } from "../../../sections/add_employee/add-employee.style";
import { useNavigate } from "react-router";
import { BlurredIcon } from "../utils/icons/icons.style";
import { FaSearch } from "react-icons/fa";
import { Label, Option, Select } from "../utils/dropdown/dropdown.style";
import { Group } from "../../../../typo/admin/response";
import { Checkbox, CircularProgress } from "@mui/material";
import { useNavigation } from "react-router-dom";
import { setFlashMessage } from "../../../../store/notification/flash-messsage-slice";
import DeleteConfirmationModal from "../utils/model/ConfirmitionModal";
export const DisplayRoles = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { roles, loading } = useAdmin();
  const [checkedRoles, setCheckedRoles] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
  const isLoading = useNavigation().state === "loading";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setAction("");
    setCheckedRoles([]);
  };

  const handleDelete = () => {
    dispacher(deleteRoleRequest(checkedRoles));
    closeModal();
  };
  const handleCheckboxChange = (userId: string) => {
    setCheckedRoles(
      (currentChecked: string[]) =>
        currentChecked.includes(userId)
          ? currentChecked.filter((id) => id !== userId) // Uncheck
          : [...currentChecked, userId] // Check
    );
  };
  useEffect(() => {
    dispacher(getRolesRequest());
  }, []);

  if (loading) return <ThreeDots size={1} />;

  if (roles.length < 1) return <NoResult>No Result</NoResult>;
  return (
    <ItemContainer>
      <ItemHeader>
        <ItemTitle>Manage Roles</ItemTitle>
        <AddBtn
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate("add-role");
          }}
        >
          Add New
        </AddBtn>
      </ItemHeader>
      {isOpen && (
        <DeleteConfirmationModal
          handleClose={closeModal}
          action={handleDelete}
        />
      )}
      <ItemBody>
        <SearchContainer>
          <BlurredIcon>
            <FaSearch />
          </BlurredIcon>
          <ItemInput placeholder="" />
          <SearchButton>Search</SearchButton>
        </SearchContainer>
        <ActionContainer>
          <Label>Action:</Label>
          <Select
            onChange={(e) => {
              e.target.value && setAction(e.target.value);
            }}
            value={action || "default"}
          >
            <Option value="default" disabled>
              action
            </Option>
            <Option value="delete">Delete</Option>
            <Option value="edit">edit</Option>
          </Select>
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (checkedRoles.length < 1) {
                  dispacher(
                    setFlashMessage({
                      title: "Reminder",
                      desc: "Please select a role",
                      status: true,
                      duration: 5,
                      type: "error",
                    })
                  );
                  return;
                }
                if (action === "delete") {
                  openModal();
                } else if (action === "edit") {
                  if (checkedRoles.length > 1) {
                    dispacher(
                      setFlashMessage({
                        title: "Reminder",
                        desc: "Please select only one role to edit",
                        status: true,
                        duration: 5,
                        type: "error",
                      })
                    );
                    return;
                  }
                  dispacher(getRolesRequest());
                  navigate(`${checkedRoles[0]}/edit`);
                } else {
                  dispacher(
                    setFlashMessage({
                      title: "Reminder",
                      desc: "Please select an action",
                      status: true,
                      duration: 5,
                      type: "error",
                    })
                  );
                  return;
                }
              }}
            >
              Apply
            </ActionButton>
          )}
        </ActionContainer>
        <CustomTable keys={Object.keys(roles[0]).length} className="shadow-md">
          <thead>
            <tr>
              <th>Action</th>
              {Object.keys(roles[0]).map((key) => (
                <th>{key.at(0)?.toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((user) => (
              <tr>
                <td>
                  <Checkbox
                    value={user.id}
                    checked={checkedRoles.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
                {Object.entries(user).map(([key, value]) => (
                  <td>
                    {key === "groups" ? (
                      <Select
                        multiple
                        size={Math.min(user.groups.length + 1, 2)}
                      >
                        {value.map((value: Group) => (
                          <option selected={true} value={value.name}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </CustomTable>
      </ItemBody>
    </ItemContainer>
  );
};
