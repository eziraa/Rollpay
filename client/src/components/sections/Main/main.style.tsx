import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
export const MainContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  height: 100%;
  width: 85vw;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;
