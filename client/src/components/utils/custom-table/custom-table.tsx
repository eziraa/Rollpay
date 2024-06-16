import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const CustomTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const TableCaption = styled.h4`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
  text-align: center;
  padding: 1rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const TableHeader = styled.div<ThemeProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.table.header};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const HeaderTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  padding: 1rem;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableRow = styled.div<ThemeProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.4rem;
  text-align: left;
  cursor: pointer;
  background-color: ${({ theme }) => theme.backgrounds.secondary};
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

export const TableData = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  padding: 0.5rem 1rem;
`;
