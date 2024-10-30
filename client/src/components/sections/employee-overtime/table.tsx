import styled from "styled-components";
import { custom_vertical_scroll_bar } from "../../utils/scroll-bar/scroll-bar";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { ThemeProps } from "../../../typo/theme/theme";
export interface TableProps extends ThemeProps {
  gridCols: string;
}

export const CustomTable = styled.table<TableProps>`
  border-collapse: collapse;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
  height: fit-content;
  tbody {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 30rem;
    ${custom_vertical_scroll_bar}
  }
  th,
  td {
    padding: 0.5rem;
    text-align: left;
    font-size: 1.4rem;
    vertical-align: middle;
    color: aliceblue;
  }
  tr {
    display: grid;
    align-items: center;
    grid-template-columns: ${({ gridCols }) => gridCols};
  }
  thead tr {
    line-height: 2;
    background-color: ${({ theme }) => theme.table.header};
  }
  tr:nth-child(even) {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.095, theme.colors.primary)};
  }

  tbody tr {
    &:hover {
      background-color: aliceblue;
      cursor: pointer;
    }
  }
  tr:nth-child(even) {
    background-color: aliceblue;

    background-color: ${({ theme }) =>
      addOpacityToColor(0.095, theme.buttons.primary)};
  }

  tbody tr:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.195, theme.buttons.primary)};
    cursor: pointer;
  }

  tbody tr td {
    color: #0e0e0eac;
  }
`;
