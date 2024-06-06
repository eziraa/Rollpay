import { VscEyeClosed } from "react-icons/vsc";
import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const PasswordVisible = styled(VscEyeClosed)<ThemeProps>`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  position: absolute;
  right: 0.3rem;
`;
