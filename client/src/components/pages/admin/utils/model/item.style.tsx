import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  height: 100%;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.1, theme.colors.primary)};
`;

export const ItemTitle = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => addOpacityToColor(0.4, theme.colors.primary)};
`;

export const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  border: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.1, theme.colors.primary)};
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.colors.primary};
`;
export const ItemInput = styled.input`
  padding: 0.7rem;
  border-radius: 0.5rem;
  border: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.1, theme.colors.primary)};
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.colors.primary};
  &:focus {
    border: 0.1rem solid
      ${({ theme }) => addOpacityToColor(0.4, theme.colors.primary)};
  }
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
    cursor: pointer;
  }
  &:disabled {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
    cursor: not-allowed;
  }
  &:read-only {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
    cursor: not-allowed;
  }
  width: 30%;

  &:invalid {
    border: 0.1rem solid red;
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.7, theme.buttons.primary)};
  color: ${({ theme }) => theme.backgrounds.primary};
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.9, theme.buttons.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const ActionContainer = styled.div`
  width: 40%;
  padding: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.7, theme.buttons.primary)};
  color: ${({ theme }) => theme.backgrounds.primary};
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.9, theme.buttons.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }

  &:focus {
    outline: none;
  }
  &:active {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.buttons.primary)};
  }
`;
