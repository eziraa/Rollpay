// export const CustomTable =

import { useEffect } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { getRolesRequest } from "../../../../store/admin/admin-slice";
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
import { Group } from "../../../../typo/admin/response";

export const DisplayRoles = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { roles, loading } = useAdmin();

  useEffect(() => {
    dispacher(getRolesRequest());
    for (const role of roles) {
      console.log(typeof role.groups);
    }
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
        <CustomTable keys={Object.keys(roles[0]).length}>
          <thead>
            <tr>
              {Object.keys(roles[0]).map((key) => (
                <th>{key.at(0)?.toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((user) => (
              <tr>
                {Object.entries(user).map(([key, value]) => (
                  <td>
                    {key === "groups" ? (
                      <Select multiple size={5}>
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
