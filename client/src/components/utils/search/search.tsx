import { useContext, useState } from "react";
import {
  noSearchResult,
  searching,
} from "../../../store/employee/employee-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { Title } from "../../sections/see-employee/see-employee.style";
import { Select, SelectOption } from "../form-elements/form.style";
import {
  ClearIcon,
  FilterIcon,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchInputContainer,
} from "./search.style";
import { Filter } from "../search-utils/filter";
import { DisplayContext } from "../../../contexts/display-context";

export const Search = () => {
  const dispatcher = useAppDispatch();
  const employee = useAppSelector((state) => state.employee);
  const [searchBy, setSearchBy] = useState("first_name");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { display, setDisplay } = useContext(DisplayContext);
  return (
    <SearchContainer>
      <SearchInputContainer>
        <SearchIcon />
        <SearchInput
          onChange={(e) => {
            // dispatcher(setLongTask(SEARCH_EMPLOYEE));
            setDisplay({
              ...display,
              search_employee: true,
              list_employees: false,
            });
            const result = searching(
              employee.employees.filter((employee) =>
                Object.entries(employee).find(([key, value]) => {
                  return (
                    key === searchBy &&
                    value
                      .toString()
                      .toLowerCase()
                      .startsWith(e.target.value.toString().toLowerCase())
                  );
                })
              )
            );
            if (result) dispatcher(searching(result.payload));
            else dispatcher(noSearchResult());
          }}
        />
        {openFilter ? (
          <ClearIcon
            onClick={() => {
              setOpenFilter(false);
            }}
          />
        ) : (
          <FilterIcon
            onClick={() => {
              setOpenFilter(true);
            }}
          />
        )}
        {openFilter && <Filter />}
      </SearchInputContainer>
      <Title style={{ fontSize: "1.5rem" }}>Search By</Title>
      <Select
        name="search"
        id="search"
        style={{
          width: "15rem",
        }}
        onChange={(e) => {
          setSearchBy(e.currentTarget.value);
        }}
      >
        <SelectOption selected value="first_name">
          First Name
        </SelectOption>
        <SelectOption value="last_name">Last Name</SelectOption>
        <SelectOption value="email">Email</SelectOption>
        <SelectOption value="phone_number">Phone Number</SelectOption>
        <SelectOption value="position">Position</SelectOption>
        <SelectOption value="gender">Gender</SelectOption>
      </Select>
    </SearchContainer>
  );
};
