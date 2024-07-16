import styled, { css } from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const MonthCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  border: 0.2rem solid
    ${({ theme }) => addOpacityToColor(0.1, theme.colors.primary)};
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 0 0.5rem
    ${({ theme }) => addOpacityToColor(0.2, theme.colors.primary)};
  transition: background-color 0.3s ease;
`;

export const MonthHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const MonthCardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
`;

export const MonthRowTemplate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  gap: 1rem;
  font-size: 1.3rem;
`;

export const MonthColumnTemplate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const MonthCell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.9, theme.backgrounds.primary)};
  }
`;

export const MonthCellCurrent = styled(MonthCell)`
  font-weight: bold;
`;

export const MonthCellDisabled = styled(MonthCell)`
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
`;

export const MonthCellToday = styled(MonthCell)`
  background-color: ${({ theme }) =>
    addOpacityToColor(0.7, theme.backgrounds.primary)};
`;

export const MonthCellSelected = styled(MonthCell)`
  background-color: ${({ theme }) =>
    addOpacityToColor(0.75, theme.backgrounds.primary)};
`;

export const MonthFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-top: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.2, theme.colors.primary)};
  font-size: 1.2rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.7, theme.backgrounds.primary)};
  }
  &:active {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.7, theme.backgrounds.primary)};
  }
  &:first-child {
    border-left: none;
  }
  &:last-child {
    border-right: none;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => addOpacityToColor(1, theme.colors.primary)};
      cursor: pointer;
    }
  }
  button:disabled {
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
    cursor: not-allowed;
  }
  button:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  button:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }
  button:first-child:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
  }
  button:last-child:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
  }
  button:first-child:active {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
  }
  button:last-child:active {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
  }
  button:first-child:disabled {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
    cursor: not-allowed;
  }
  button:last-child:disabled {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.8, theme.backgrounds.primary)};
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
    cursor: not-allowed;
  }
  button:first-child:focus {
    outline: none;
  }
  button:last-child:focus {
    outline: none;
  }
`;

export const bar_css = css`
  height: 3rem;
  width: 0.7rem;
  border-radius: 1rem;
`;
export const GreenBar = styled.div`
  ${bar_css}
  background-color: #00df98;
`;

export const RedBar = styled.div`
  ${bar_css}
  background-color: #ff3939;
`;
export const YellowBar = styled.div`
  ${bar_css}
  background-color: #ffcc00;
`;

export const CircularBar = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
`;
