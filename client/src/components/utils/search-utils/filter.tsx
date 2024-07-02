import { SelectOption } from "../form-elements/form.style";
import { useFilter } from "../../../hooks/filter-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import {
  ButtonContainer,
  ClearButton,
  FilterButton,
  FilterContainer,
  FilterInput,
  FilterLabel,
  FilterRow,
  FilterSelect,
} from "./filter.style";
import { usePosition } from "../../../hooks/position-hook";
import { EmployeeFilter } from "../../../contexts/filter-context";
import { filterEmployeeRequest } from "../../../store/employee/employee-slice";
export const getQueryString = (params: EmployeeFilter) => {
  const queryString = Object.entries(params)
    .filter(
      ([key, value]) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        key !== "filter_by"
    )
    .map(([key, value]) => {
      if (typeof value === "object") {
        return Object.entries(value)
          .map(
            ([nested_key, nested_value]) =>
              `${key}[${nested_key}]=${encodeURIComponent(
                nested_value as string
              )}`
          )
          .join("&");
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return queryString;
};
export const Filter = ({ close }: { close: () => void }) => {
  // Get the current filter and position state from the Redux store
  const { filter, setFilter } = useFilter();
  const { positions } = usePosition();
  const dispatcher = useAppDispatch();

  // Function to convert the filter object to a query string

  return (
    <FilterContainer>
      <FilterRow>
        <FilterLabel>Search By</FilterLabel>
        <FilterSelect
          defaultValue={filter.filter_by || "name"}
          onChange={(e) => {
            if (e.currentTarget.value) {
              setFilter({
                ...filter,
                filter_by: e.currentTarget.value,
              });
            }
          }}
        >
          <SelectOption value={"name"}>Name</SelectOption>
          <SelectOption value={"id"}>Employee ID</SelectOption>
          <SelectOption value={"gender"}>Gender</SelectOption>
          <SelectOption value={"email"}>email</SelectOption>
          <SelectOption value={"phone_number"}>Phone number</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Sort By</FilterLabel>
        <FilterSelect
          defaultValue={filter.order_by || "name"}
          onChange={(e) => {
            if (e.currentTarget.value) {
              setFilter({
                ...filter,
                order_by: e.currentTarget.value,
              });
            }
          }}
        >
          <SelectOption value={"name"}>Name</SelectOption>
          <SelectOption value={"position"}>Position</SelectOption>
          <SelectOption value={"gender"}>Gender</SelectOption>
          <SelectOption value={"email"}>email</SelectOption>
          <SelectOption value={"phone_number"}>Phone number</SelectOption>
          <SelectOption value={"salary"}> Salary</SelectOption>
          <SelectOption value={"date_of_hire"}>Date of hire</SelectOption>
          <SelectOption value={"date_of_birth"}>Date of birth</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Order</FilterLabel>
        <FilterSelect
          value={filter.order || "asc"}
          onChange={(e) => {
            if (e.currentTarget.value) {
              setFilter({
                ...filter,
                order: e.currentTarget.value,
              });
            }
          }}
        >
          <SelectOption value={"asc"}>Ascending</SelectOption>
          <SelectOption value={"desc"}>Descending</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Select Position</FilterLabel>
        <FilterSelect
          defaultValue={filter.position || "default"}
          onChange={(e) => {
            if (e.currentTarget.value) {
              setFilter({
                ...filter,
                position: e.currentTarget.value,
              });
            }
          }}
        >
          <SelectOption value={"default"}>Select Position</SelectOption>
          {positions.map((position) => {
            return (
              <SelectOption key={position.id} value={position.position_name}>
                {position.position_name}
              </SelectOption>
            );
          })}
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Salary Range </FilterLabel>
        <FilterLabel>From</FilterLabel>
        <FilterSelect
          name="salary_from"
          value={filter.salary_range?.min || "default"}
          onChange={(e) => {
            if (e.currentTarget.value) {
              if (
                filter.salary_range?.max &&
                filter.salary_range.max <= parseInt(e.currentTarget.value)
              ) {
                dispatcher(
                  setFlashMessage({
                    desc: "Min salary should be less than max salary",
                    type: "error",
                    title: "Invalid min salary range",
                    status: true,
                    duration: 10,
                  })
                );
                e.currentTarget.value = "Please select a valid salary range";
              } else
                setFilter({
                  ...filter,
                  salary_range: {
                    max: filter.salary_range?.max || 0,
                    min: parseInt(e.currentTarget.value),
                  },
                });
            }
          }}
        >
          <SelectOption value={"default"}>min</SelectOption>
          <SelectOption value={6000}>6000</SelectOption>
          <SelectOption value={10000}>10000</SelectOption>
          <SelectOption value={15000}>15000</SelectOption>
          <SelectOption value={25000}>25000</SelectOption>
          <SelectOption value={30000}>30000</SelectOption>
        </FilterSelect>
        <FilterLabel>To</FilterLabel>
        <FilterSelect
          value={filter.salary_range?.max || "default"}
          onChange={(e) => {
            if (e.currentTarget.value) {
              if (
                filter.salary_range?.min &&
                filter.salary_range.min >= parseInt(e.currentTarget.value)
              ) {
                dispatcher(
                  setFlashMessage({
                    desc: "Max salary should be greater than min salary",
                    type: "error",
                    title: "Invalid Min salary range",
                    status: true,
                    duration: 10,
                  })
                );
                e.currentTarget.value = "Please select a valid salary range";
              } else
                setFilter({
                  ...filter,
                  salary_range: {
                    max: parseInt(e.currentTarget.value),
                    min: filter.salary_range?.min || 0,
                  },
                });
            }
          }}
        >
          <SelectOption value={"default"}>10000</SelectOption>
          <SelectOption value={10000}>10000</SelectOption>
          <SelectOption value={15000}>15000</SelectOption>
          <SelectOption value={25000}>25000</SelectOption>
          <SelectOption value={30000}>30000</SelectOption>
          <SelectOption value={50000}>50000</SelectOption>
        </FilterSelect>
      </FilterRow>

      <FilterRow>
        <FilterLabel>Date of hire</FilterLabel>
        <FilterLabel>From</FilterLabel>
        <FilterInput
          value={filter.date_of_hire_range?.from || "select"}
          onChange={(e) => {
            if (e.target.value) {
              if (
                filter.date_of_hire_range?.to &&
                new Date(filter.date_of_hire_range.to) <=
                  new Date(e.currentTarget.value)
              ) {
                dispatcher(
                  setFlashMessage({
                    desc: "Start date of date of hire  should be less than end date",
                    type: "error",
                    title: "Invalid start date range",
                    status: true,
                    duration: 10,
                  })
                );
                e.currentTarget.value = "";
              } else
                setFilter({
                  ...filter,
                  date_of_hire_range: {
                    from: e.target.value,
                    to: filter.date_of_hire_range?.to || "",
                  },
                });
            }
          }}
          type="date"
        />
        <FilterLabel>To</FilterLabel>
        <FilterInput
          value={filter.date_of_hire_range?.to || "select"}
          type="date"
          onChange={(e) => {
            if (e.target.value) {
              if (
                filter.date_of_hire_range?.from &&
                new Date(filter.date_of_hire_range.from) >=
                  new Date(e.currentTarget.value)
              ) {
                dispatcher(
                  setFlashMessage({
                    desc: "End date  of date of hire  should be greater than start date",
                    type: "error",
                    title: "Invalid end date range",
                    status: true,
                    duration: 10,
                  })
                );
                e.currentTarget.value = "Please select a valid date range";
              } else
                setFilter({
                  ...filter,
                  date_of_hire_range: {
                    from: filter.date_of_hire_range?.from || "",
                    to: e.target.value,
                  },
                });
            }
          }}
        />
      </FilterRow>
      <FilterRow>
        <ButtonContainer>
          <ClearButton
            onClick={() => {
              setFilter({
                filter_by: "",
                order_by: "",
                order: "",
                position: "",
                salary_range: {
                  min: 0,
                  max: 0,
                },
                date_of_hire_range: {
                  from: "",
                  to: "",
                },
              });
              console.log(filter);
            }}
          >
            Clear
          </ClearButton>
          <FilterButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (filter.filter_by) close();
              else
                dispatcher(
                  setFlashMessage({
                    desc: "Please select filter by option to start search",
                    type: "error",
                    title: "Filter by not selected",
                    status: true,
                    duration: 5,
                  })
                );
            }}
          >
            Start search
          </FilterButton>
          <FilterButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (
                Object.entries(filter).some(
                  ([key, value]) => value && key !== "filter_by"
                )
              ) {
                dispatcher(
                  filterEmployeeRequest(
                    "employee/filter?" + getQueryString(filter)
                  )
                );
              } else
                dispatcher(
                  setFlashMessage({
                    desc: "Please select filter by option to filter",
                    type: "error",
                    title: "Filter by not selected",
                    status: true,
                    duration: 5,
                  })
                );
            }}
          >
            Filter
          </FilterButton>
        </ButtonContainer>
      </FilterRow>
    </FilterContainer>
  );
};
