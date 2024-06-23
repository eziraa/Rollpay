import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const CustomTable = styled.table`
  /* display: flex;
  flex-direction: column;
  align-items: start; */
  border-collapse: collapse;
  border: none;
  width: 100%;
`;

export const Caption = styled.h4`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
  text-align: left;
  padding: 1rem;
  width: 15rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const TableHeader = styled.tr<ThemeProps>`
  width: 100%;
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.table.header};
  color: ${({ theme }) => theme.colors.primary};
  /* font-size: 1.4rem; */
  font-weight: bold;
  text-align: center;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const HeaderTitle = styled.th`
  /* font-size: 1.4rem; */
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  padding: 1rem;
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableRow = styled.tr<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.4, theme.table.tableRow)};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.backgrounds.primary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.table.tableRowHover};
  }
  &:last-child {
    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
  }
`;

export const TableData = styled.td`
  /* font-size: 1.4rem; */
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  padding-left: 0.5rem;
  line-height: 2.5;
`;
