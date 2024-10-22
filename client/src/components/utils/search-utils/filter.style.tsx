import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { Input, Select } from "../form-elements/form.style";
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
  left: 21vw;
  right: 0;
  top: 21vh;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  box-shadow: 0 0.5rem 2rem 0
    ${({ theme }) => addOpacityToColor(0.29, theme.colors.primary)};
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
  border-bottom: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  &:focus {
    border: none;
  }
`;

export const FilterButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.buttons.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
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
