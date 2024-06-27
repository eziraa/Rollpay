import styled from "styled-components";
import { Input, Select, SelectOption } from "../form-elements/form.style";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { useFilter } from "../../../hooks/filter-hook";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 40vw;
  gap: 1rem;
  padding: 2rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  box-shadow: 0 0 0.5rem 0 ${({ theme }) => theme.colors.primary};
  z-index: 100;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;

export const FilterLabel = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  flex: 0.9;
  &:not(:first-child) {
    margin-left: 1rem;
  }
`;
export const FilterSelect = styled(Select)`
  padding: 1rem;
  font-size: 1.2rem;
  flex: 1;
  max-width: 30%;
`;

export const FilterInput = styled(Input)`
  width: fit-content;
  padding: 1rem;
  font-size: 1.2rem;
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  &:focus {
    border: none;
  }
`;

export const FilterButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.buttons.primary};
  color: #ffffff;
  border-radius: 0.5rem;
  border: none;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
    color: #ffffff;
  }
  width: fit-content;
  justify-self: end;
  position: relative;
`;

export const ClearButton = styled(FilterButton)`
  background-color: ${({ theme }) =>
    addOpacityToColor(0.7, theme.buttons.primary)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
`;
export const Filter = () => {
  const { filter, setFilter } = useFilter();
  const { positions } = useAppSelector((state) => state.position);
  const dispatcher = useAppDispatch();

  return (
    <FilterContainer>
      <FilterRow>
        <FilterLabel>Search By</FilterLabel>
        <FilterSelect
          defaultValue={"name"}
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
          <SelectOption value={"position"}>Position</SelectOption>
          <SelectOption value={"gender"}>Gender</SelectOption>
          <SelectOption value={"email"}>email</SelectOption>
          <SelectOption value={"phone_number"}>Phone number</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Sort By</FilterLabel>
        <FilterSelect
          defaultValue={"date_of_hire"}
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
          onChange={(e) => {
            if (e.currentTarget.value) {
              setFilter({
                ...filter,
                position: e.currentTarget.value,
              });
            }
          }}
        >
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
          <SelectOption value={3000}>3000</SelectOption>
          <SelectOption value={6000}>6000</SelectOption>
          <SelectOption value={10000}>10000</SelectOption>
          <SelectOption value={15000}>15000</SelectOption>
          <SelectOption value={25000}>25000</SelectOption>
          <SelectOption value={30000}>30000</SelectOption>
        </FilterSelect>
        <FilterLabel>To</FilterLabel>
        <FilterSelect
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
        <FilterLabel>Date of Birth</FilterLabel>
        <FilterLabel>From</FilterLabel>
        <FilterInput
          type="date"
          onChange={(e) => {
            if (e.target.value) {
              if (
                filter.date_of_birth_range?.to &&
                new Date(filter.date_of_birth_range.to) <=
                  new Date(e.currentTarget.value)
              ) {
                dispatcher(
                  setFlashMessage({
                    desc: "Start date of date  of birth  should be less than end date",
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
                  date_of_birth_range: {
                    from: e.target.value,
                    to: filter.date_of_birth_range?.to || "",
                  },
                });
            }
          }}
        />
        <FilterLabel>To</FilterLabel>
        <FilterInput
          type="date"
          onChange={(e) => {
            if (e.target.value) {
              if (
                filter.date_of_birth_range?.from &&
                new Date(filter.date_of_birth_range.from) >=
                  new Date(e.currentTarget.value)
              ) {
                dispatcher(
                  setFlashMessage({
                    desc: "End of date of birth  should be greater than start date",
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
                  date_of_birth_range: {
                    from: filter.date_of_birth_range?.from || "",
                    to: e.target.value,
                  },
                });
            }
          }}
        />
      </FilterRow>
      <FilterRow>
        <ButtonContainer>
          <ClearButton>Cancel</ClearButton>
          <ClearButton>Start search</ClearButton>
          <FilterButton
            onClick={() => {
              console.log(filter);
            }}
          >
            Filter
          </FilterButton>
        </ButtonContainer>
      </FilterRow>
    </FilterContainer>
  );
};
