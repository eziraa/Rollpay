import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const LoginContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  width: 30%;
  height: 60%;
  box-shadow: 0px 0px 1rem 0px ${({ theme }) => theme.colors.secondary}px;
`;
