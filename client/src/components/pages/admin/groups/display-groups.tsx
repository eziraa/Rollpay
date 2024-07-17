// export const CustomTable =

import { useEffect } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { getGroupsRequest } from "../../../../store/admin/admin-slice";
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
import { Label, Select } from "../utils/dropdown/dropdown.style";
import { DropDown } from "../utils/dropdown/dropdown";
import { Permission } from "../../../../typo/admin/response";

export const DisplayGroups = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { groups, loading } = useAdmin();

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
          <DropDown />
          <ActionButton>Apply</ActionButton>
        </ActionContainer>

        <CustomTable keys={Object.keys(groups[0]).length}>
          <thead>
            <tr>
              {Object.keys(groups[0]).map((key) => (
                <th>{key.at(0)?.toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr>
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
