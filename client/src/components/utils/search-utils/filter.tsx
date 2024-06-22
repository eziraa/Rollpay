import styled from "styled-components";
import { Input, Select, SelectOption } from "../form-elements/form.style";
import { addOpacityToColor } from "../convertor/add-opacity-color";

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
  gap: 2rem;
`;

export const FilterLabel = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
`;
export const FilterSelect = styled(Select)`
  width: 30%;
  padding: 1rem;
  font-size: 1.2rem;
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
  return (
    <FilterContainer>
      <FilterRow>
        <FilterLabel>Filter By</FilterLabel>
        <FilterSelect>
          <SelectOption>Name</SelectOption>
          <SelectOption>Department</SelectOption>
          <SelectOption>Gender</SelectOption>
          <SelectOption>Salary</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Sort By</FilterLabel>
        <FilterSelect>
          <SelectOption>Name</SelectOption>
          <SelectOption>Department</SelectOption>
          <SelectOption>Gender</SelectOption>
          <SelectOption>Salary</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Order</FilterLabel>
        <FilterSelect>
          <SelectOption>Ascending</SelectOption>
          <SelectOption>Descending</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Salary Range </FilterLabel>
        <FilterLabel>From</FilterLabel>
        <FilterSelect>
          <SelectOption>3000</SelectOption>
          <SelectOption>6000</SelectOption>
          <SelectOption>10000</SelectOption>
          <SelectOption>15000</SelectOption>
          <SelectOption>25000</SelectOption>
          <SelectOption>30000</SelectOption>
        </FilterSelect>
        <FilterLabel>To</FilterLabel>
        <FilterSelect>
          <SelectOption>3000</SelectOption>
          <SelectOption>6000</SelectOption>
          <SelectOption>10000</SelectOption>
          <SelectOption>15000</SelectOption>
          <SelectOption>25000</SelectOption>
          <SelectOption>30000</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Select Position</FilterLabel>
        <FilterSelect>
          <SelectOption>Sales Manager</SelectOption>
          <SelectOption>Backend Developer</SelectOption>
          <SelectOption>Software Engineer</SelectOption>
          <SelectOption>DeVops Engineer</SelectOption>
          <SelectOption>QA Engineer</SelectOption>
        </FilterSelect>
      </FilterRow>
      <FilterRow>
        <FilterLabel>Date of Birth</FilterLabel>
        <FilterLabel>From</FilterLabel>
        <FilterInput type="date" />
        <FilterLabel>To</FilterLabel>
        <FilterInput type="date" />
      </FilterRow>
      <FilterRow>
        <FilterLabel>Date of Hire</FilterLabel>
        <FilterLabel>From</FilterLabel>
        <FilterInput type="date" />
        <FilterLabel>To</FilterLabel>
        <FilterInput type="date" />
      </FilterRow>
      <FilterRow>
        <ButtonContainer>
          <ClearButton>Clear</ClearButton>
          <FilterButton>Filter</FilterButton>
        </ButtonContainer>
      </FilterRow>
    </FilterContainer>
  );
};
