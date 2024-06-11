import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const HomeContainer = styled.div<ThemeProps>`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  /* gap: 1rem;
  padding: 0rem; */
  border-radius: 0.5rem;
`;

export const HomeBody = styled.div<ThemeProps>`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  flex-direction: row;
`;

