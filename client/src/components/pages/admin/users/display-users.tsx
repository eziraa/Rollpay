/* eslint-disable @typescript-eslint/no-unused-vars */
// export const CustomTable =

import { useEffect, useState } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import CircularProgress from "@mui/material/CircularProgress";

import {
  activateUserRequest,
  deleteUserRequest,
  getRolesRequest,
  getUsersRequest,
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
import { useNavigation } from "react-router-dom";
import { BlurredIcon } from "../utils/icons/icons.style";
import { FaSearch } from "react-icons/fa";
import { Label, Select, Option } from "../utils/dropdown/dropdown.style";
import { CheckBox } from "../utils/add-item/add-item.style";
import { setFlashMessage } from "../../../../store/notification/flash-messsage-slice";
import { User } from "../../../../typo/admin/response";
import DeleteConfirmationModal from "../utils/model/ConfirmitionModal";
import { Button } from "@mui/material";

export const DisplayUsers = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading, task_finished } = useAdmin();
  const [all_users, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
  const [actionId, setActionId] = useState<string>("");
  const isLoading = useNavigation().state === "loading";
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setAction("");
    setCheckedUsers([]);
  };

  const handleDelete = () => {
    dispacher(deleteUserRequest(checkedUsers));
    closeModal();
  };
  // Handle checkbox change
  const handleCheckboxChange = (userId: string) => {
    setCheckedUsers(
      (currentChecked: string[]) =>
        currentChecked.includes(userId)
          ? currentChecked.filter((id) => id !== userId) // Uncheck
          : [...currentChecked, userId] // Check
    );
  };
  const exclude_keys = [
    "is_admin",
    "is_staff",
    "password",
    "empID",
    "is_active",
  ];
  useEffect(() => {
    dispacher(getUsersRequest());
  }, []);
  useEffect(() => {
    setAllUsers(users);
  }, [users]);
  useEffect(() => {
    users &&
      !!search &&
      setAllUsers(
        users.filter(
          (user) =>
            user.first_name
              .toLowerCase()
              .includes(search.toString().toLowerCase()) ||
            user.last_name
              .toLowerCase()
              .includes(search.toString().toLowerCase())
        )
      );
  }, [search]);
  if (loading) return <ThreeDots size={1} />;

  return (
    <ItemContainer>
      <ItemHeader>
        <ItemTitle>Manage Users</ItemTitle>
        <AddBtn
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate("add-user");
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
          <ItemInput
            placeholder=""
            onChange={(e) => {
              e.preventDefault();
              if (e.target.value !== "") {
                setSearch(e.target.value);
              }
            }}
          />
          <SearchButton>Search</SearchButton>
        </SearchContainer>
        <ActionContainer>
          <Label>Action:</Label>
          <Select
            value={action}
            onChange={(e) => {
              e.target.value && setAction(e.target.value);
            }}
          >
            <Option value="" disabled>
              Select Action
            </Option>
            <Option value="delete">Delete</Option>
            <Option value="edit">Edit</Option>
          </Select>
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (checkedUsers.length < 1) {
                  dispacher(
                    setFlashMessage({
                      title: "Reminder",
                      desc: "Please select a user",
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
                  if (checkedUsers.length > 1) {
                    dispacher(
                      setFlashMessage({
                        title: "Reminder",
                        desc: "Please select only one user to edit",
                        status: true,
                        duration: 5,
                        type: "error",
                      })
                    );
                    return;
                  }
                  dispacher(getRolesRequest());
                  navigate(`${checkedUsers[0]}/edit`);
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
        {all_users && all_users.length > 0 ? (
          <CustomTable
            keys={
              Object.keys(all_users[0]).filter(
                (key) => !exclude_keys.includes(key)
              ).length
            }
            className="shadow-md text-slate-700"
          >
            <thead>
              <tr>
                <th>Select</th>
                {Object.keys(all_users[0])
                  .filter((key) => !exclude_keys.includes(key))
                  .map((key) => (
                    <th key={key}>
                      {key
                        .split("_")
                        .map((k) => k.at(0)?.toUpperCase() + k.slice(1))
                        .join(" ")}
                    </th>
                  ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-slate-700  ">
              {all_users.map((user) => (
                <tr>
                  <td>
                    <CheckBox
                      type="checkbox"
                      value={user.id}
                      checked={checkedUsers.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </td>
                  {Object.entries(user)
                    .filter(([key]) => !exclude_keys.includes(key))
                    .map(([_, value]) => (
                      <td>
                        {typeof value === "string" || typeof value === "number"
                          ? value
                          : value["name"]}
                      </td>
                    ))}
                  <td
                    style={{
                      color: user.is_active ? "#0cf292" : "red",
                    }}
                  >
                    {user.is_active ? "active" : "inactive"}
                  </td>
                  <td>
                    <Button
                      variant="outlined"
                      color={user.is_active ? "error" : "success"}
                      disabled={!task_finished && actionId === user.id}
                      className={
                        !task_finished && actionId === user.id
                          ? "bg-slate-200"
                          : ""
                      }
                      onClick={() => {
                        setActionId(user.id);
                        dispacher(activateUserRequest(user.id));
                      }}
                    >
                      {user.is_active ? "deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        ) : (
          <NoResult>No Result</NoResult>
        )}
      </ItemBody>
    </ItemContainer>
  );
};
