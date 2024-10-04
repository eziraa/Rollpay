/* eslint-disable @typescript-eslint/no-unused-vars */
// export const CustomTable =

import { useEffect, useState } from "react";
import { useAdmin } from "../../../../hooks/admin-hook";
import { useAppDispatch } from "../../../../utils/custom-hook";
import {
  getRolesRequest,
  getEmployeesRequest,
  deleteEmployeesRequest,
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
import { CheckBox } from "../utils/add-item/add-item.style";
import { setFlashMessage } from "../../../../store/notification/flash-messsage-slice";
import { AdminEmployee } from "../../../../typo/admin/response";

export const DisplayEmployees = () => {
  /**
   * Calling hooks and getting necessary imformations
   */
  const dispacher = useAppDispatch();
  const navigate = useNavigate();
  const { employees, loading } = useAdmin();
  const [all_employees, setAllEmployees] = useState<AdminEmployee[]>([]);
  const [search, setSearch] = useState<string>("");
  const [checkedEmployees, setCheckedEmployees] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
  // Handle checkbox change
  const handleCheckboxChange = (employeeId: string) => {
    setCheckedEmployees(
      (currentChecked: string[]) =>
        currentChecked.includes(employeeId)
          ? currentChecked.filter((id) => id !== employeeId) // Uncheck
          : [...currentChecked, employeeId] // Check
    );
  };
  useEffect(() => {
    dispacher(getEmployeesRequest());
  }, []);
  useEffect(() => {
    setAllEmployees(employees);
  }, [employees]);
  useEffect(() => {
    employees &&
      setAllEmployees(
        employees.filter(
          (employee) =>
            employee.first_name
              .toLowerCase()
              .includes(search.toString().toLowerCase()) ||
            employee.last_name
              .toLowerCase()
              .includes(search.toString().toLowerCase())
        )
      );
  }, [search]);
  if (loading) return <ThreeDots size={1} />;

  return (
    <ItemContainer>
      <ItemHeader className="shadow-md">
        <ItemTitle>Manage Employees</ItemTitle>
        <AddBtn
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate("add-employee");
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
          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (checkedEmployees.length < 1) {
                dispacher(
                  setFlashMessage({
                    title: "Reminder",
                    desc: "Please select a employee",
                    status: true,
                    duration: 5,
                    type: "error",
                  })
                );
                return;
              }
              if (action === "delete") {
                dispacher(deleteEmployeesRequest(checkedEmployees));
              } else if (action === "edit") {
                if (checkedEmployees.length > 1) {
                  dispacher(
                    setFlashMessage({
                      title: "Reminder",
                      desc: "Please select only one employee to edit",
                      status: true,
                      duration: 5,
                      type: "error",
                    })
                  );
                  return;
                }
                dispacher(getRolesRequest());
                navigate(`${checkedEmployees[0]}/edit`);
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
              setCheckedEmployees([]);
            }}
          >
            Apply
          </ActionButton>
        </ActionContainer>
        {all_employees && all_employees.length > 0 ? (
          <CustomTable keys={Object.keys(all_employees[1]).length}>
            <thead>
              <tr>
                <th>Action</th>
                {Object.keys(all_employees[0]).map((key) => (
                  <th>{key.at(0)?.toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {all_employees.map((employee) => (
                <tr>
                  <td>
                    <CheckBox
                      type="checkbox"
                      value={employee.id}
                      checked={checkedEmployees.includes(employee.id)}
                      onChange={() => handleCheckboxChange(employee.id)}
                    />
                  </td>
                  {Object.entries(employee).map(([_, value]) => (
                    <td>{value}</td>
                  ))}
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
