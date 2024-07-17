// export const CustomTable =

import { useEffect } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import { getUsersRequest } from "../../../../store/admin/admin-slice";
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
import { Label } from "../utils/dropdown/dropdown.style";
import { DropDown } from "../utils/dropdown/dropdown";

export const DisplayUsers = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading } = useAdmin();

  useEffect(() => {
    dispacher(getUsersRequest());
  }, []);

  if (loading) return <ThreeDots size={1} />;

  if (users.length < 1) return <NoResult>No Result</NoResult>;
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

        <CustomTable keys={Object.keys(users[0]).length}>
          <thead>
            <tr>
              {Object.keys(users[0]).map((key) => (
                <th>{key.at(0)?.toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                {Object.values(user).map((value) => (
                  <td>{typeof value === "string" ? value : value["name"]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </CustomTable>
      </ItemBody>
    </ItemContainer>
  );
};
