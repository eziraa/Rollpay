/* eslint-disable react-hooks/exhaustive-deps */
// export const CustomTable =

import { useEffect, useState } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import {
  deleteGroupRequest,
  getGroupsDone,
  getGroupsRequest,
} from "../../../../store/admin/admin-slice";
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
import { Label, Select, Option } from "../utils/dropdown/dropdown.style";
import { Permission } from "../../../../typo/admin/response";
import { CheckBox } from "../utils/add-item/add-item.style";
import { setFlashMessage } from "../../../../store/notification/flash-messsage-slice";
import { useNavigation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import DeleteConfirmationModal from "../utils/model/ConfirmitionModal";
import BodyLoader from "../../../utils/loading/body-loading";
export const DisplayGroups = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { groups, loading } = useAdmin();
  const [search, setSearch] = useState<string>("");
  const [checkedGroups, setCheckedGroups] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
  const isLoading = useNavigation().state === "loading";
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setAction("");
    setCheckedGroups([]);
  };

  const handleDelete = () => {
    dispacher(deleteGroupRequest(checkedGroups));
    closeModal();
  };
  // Handle checkbox change
  const handleCheckboxChange = (groupId: string) => {
    setCheckedGroups(
      (currentChecked: string[]) =>
        currentChecked.includes(groupId)
          ? currentChecked.filter((id) => id !== groupId) // Uncheck
          : [...currentChecked, groupId] // Check
    );
  };
  useEffect(() => {
    dispacher(getGroupsRequest());
  }, []);
  useEffect(() => {
    dispacher(
      getGroupsDone(groups.filter((group) => group.name.startsWith(search)))
    );
  }, [search]);

  return (
    <ItemContainer>
      <ItemHeader>
        <ItemTitle>Manage Groups</ItemTitle>
        <AddBtn
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate("add-group");
          }}
        >
          Add New
        </AddBtn>
      </ItemHeader>
      {isOpen && checkedGroups.length > 0 && (
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
              } else {
                dispacher(getGroupsRequest());
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
                if (checkedGroups.length < 1) {
                  dispacher(
                    setFlashMessage({
                      title: "Reminder",
                      desc: "Please select a group",
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
                  if (checkedGroups.length > 1) {
                    dispacher(
                      setFlashMessage({
                        title: "Reminder",
                        desc: "Please select only one group to edit",
                        status: true,
                        duration: 5,
                        type: "error",
                      })
                    );
                    return;
                  }
                  navigate(`${checkedGroups[0]}/edit`);
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
        {groups && groups.length > 0 ? (
          <CustomTable
            keys={Object.keys(groups[0]).length}
            className="shadow-md"
          >
            <thead>
              <tr>
                <th>Action</th>
                {Object.keys(groups[0]).map((key) => (
                  <th>{key.at(0)?.toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td>
                    <CheckBox
                      type="checkbox"
                      value={group.id}
                      checked={checkedGroups.includes(group.id)}
                      onChange={() => handleCheckboxChange(group.id)}
                    />
                  </td>
                  {Object.entries(group).map(([key, value]) => (
                    <td>
                      {key === "permissions" ? (
                        <Select
                          multiple
                          size={Math.min(group.permissions.length + 1, 4)}
                        >
                          {value.map((value: Permission) => (
                            <option value={value.codename}>{value.name}</option>
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
        ) : (
          <NoResult>No Result</NoResult>
        )}
      </ItemBody>
      {loading && <BodyLoader />}
    </ItemContainer>
  );
};
