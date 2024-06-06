import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const PasswordVisible = styled.div<ThemeProps>`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  position: absolute;
  right: 0.5rem;
`;
