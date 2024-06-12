import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const ListContainer = styled.table<ThemeProps>`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
  border-bottom: 0.1rem solid black;
  position: relative;
  display: flex;
`;
export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
export const ListHeader = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.table.header};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 600;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 0.4rem 0.5rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const ListTitle = styled.td<ThemeProps>`
  padding: 1rem 1rem;
  width: 15rem;
  &:nth-child(3) {
    width: 5rem;
  }

  &:nth-child(4) {
    width: 25rem;
  }
`;

export const ListRow = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.backgrounds.primary};
  }
  font-size: larger;
  padding: 0.4rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  &:hover {
    background-color: ${({ theme }) => theme.table.tableRowHover};
    cursor: pointer;
  }
`;

export const Data = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 1rem;
  text-align: left;
  width: 15rem;
  &:nth-child(3) {
    width: 5rem;
  }

  &:nth-child(4) {
    width: 25rem;
  }
  /* width: auto; */
`;
