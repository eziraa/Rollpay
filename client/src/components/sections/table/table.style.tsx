import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const TableContainer = styled.table<ThemeProps>`
  width: 85%;
  font-family: sans-serif;
  position: absolute;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
  border-bottom: 0.1rem solid black;
  margin-top: 2rem;
  /* background-color: ${({ theme }) => theme.backgrounds.secondary}; */
`;
export const TableHeaderRow = styled.tr<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.secondary};
`;

export const TableHeader = styled.th<ThemeProps>`
  border-right: 1px solid ${({ theme }) => theme.backgrounds.secondary};

`;

export const TableBodyRow = styled.tr<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const BodyData = styled.td<ThemeProps>`
  align-items: center;
  padding-left: 0.7rem;
  color: ${({ theme }) => theme.colors.primary}
`;

