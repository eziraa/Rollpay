import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const ListContainer = styled.table<ThemeProps>`
  width: 85vw;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
  border-bottom: 0.1rem solid black;
  margin-top: 2rem;
  position: relative;
  padding: 2rem;
`;
export const ListHeader = styled.tr<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 600;
`;

export const ListTitle = styled.td<ThemeProps>`
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
  padding: 0.4rem 0.5rem;
`;

export const ListRow = styled.tr<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.backgrounds.primary};
  }
  font-size: larger;
  padding: 0.4rem 0.5rem;
`;

export const Data = styled.td<ThemeProps>`
  padding-left: 0.7rem;
  color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  width: auto;
`;

