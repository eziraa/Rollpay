import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";
import { custom_vertical_scroll_bar } from "../../../../utils/scroll-bar/scroll-bar";
import { ThemeProps } from "../../../../../typo/theme/theme";
export interface TableProps extends ThemeProps {
  keys: number;
}

export const CustomTable = styled.table<TableProps>`
  border-collapse: collapse;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
  height: fit-content;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  tbody {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 30rem;
    ${custom_vertical_scroll_bar}
  }
  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.backgrounds.primary};
    padding: 0.5rem;
    text-align: left;
    font-size: 1.4rem;
    vertical-align: middle;
  }
  tr {
    display: grid;
    grid-template-columns: 0.5fr repeat(${({ keys }) => keys - 2}, 1fr) 2fr 1fr;
  }
  thead tr {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.095, theme.colors.primary)};
    line-height: 2;
    background-color: ${({ theme }) => theme.backgrounds.secondary};
  }
  tr:nth-child(even) {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.095, theme.colors.primary)};
  }

  tr {
    &:not(:first-child) {
      &:hover {
        background-color: aliceblue;
        cursor: pointer;
      }
    }
  }
`;
