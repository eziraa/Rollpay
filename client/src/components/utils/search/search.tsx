import { useEffect, useState } from "react";
import {
  filterEmployeeRequest,
  listEmpRequested,
} from "../../../store/employee/employee-slice";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  ClearIcon,
  FilterIcon,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchInputContainer,
} from "./search.style";
import { Filter, getQueryString } from "../search-utils/filter";
import { listPositionsRequested } from "../../../store/position/position-slice";
import { useFilter } from "../../../hooks/filter-hook";

export const Search = () => {
  // Calling hooks and Getting necessary information
  const dispatcher = useAppDispatch();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { filter } = useFilter();
  const [search_val, setSearchVal] = useState<string>("");
  useEffect(() => {
    if (!search_val) return;
    const loadEmployee = setTimeout(() => {
      let query_string = getQueryString(filter);
      query_string += `&search_value=${search_val}`;
      dispatcher(
        filterEmployeeRequest(
          `employee/filter/${filter.filter_by || "name"}?${query_string}`
        )
      );
    }, 500);

    return () => clearTimeout(loadEmployee);
  }, [search_val]);

  return (
    <SearchContainer>
      <SearchInputContainer>
        <SearchIcon color="#a6a6a6" />
        <SearchInput
          onChange={(e) => {
            if (e.target.value.trim()) setSearchVal(e.target.value);
            else dispatcher(listEmpRequested());
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
              dispatcher(listPositionsRequested());
            }}
          />
        )}
        {openFilter && (
          <Filter
            close={() => {
              setOpenFilter(false);
            }}
          />
        )}
      </SearchInputContainer>
    </SearchContainer>
  );
};
