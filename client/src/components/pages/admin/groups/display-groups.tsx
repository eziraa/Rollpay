// export const CustomTable =

import { useEffect, useState } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import {
  deleteGroupRequest,
  getGroupsRequest,
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
import { Label, Select, Option } from "../utils/dropdown/dropdown.style";
import { Permission } from "../../../../typo/admin/response";
import { CheckBox } from "../utils/add-item/add-item.style";
import { setFlashMessage } from "../../../../store/notification/flash-messsage-slice";

export const DisplayGroups = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { groups, loading } = useAdmin();
  const [checkedGroups, setCheckedGroups] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
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

  if (loading) return <ThreeDots size={1} />;

  if (groups.length < 1) return <NoResult>No Result</NoResult>;
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
                dispacher(deleteGroupRequest(checkedGroups));
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
              setAction("");
              setCheckedGroups([]);
            }}
          >
            Apply
          </ActionButton>
        </ActionContainer>

        <CustomTable keys={Object.keys(groups[0]).length}>
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
                      <Select multiple size={5}>
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
      </ItemBody>
    </ItemContainer>
  );
};
