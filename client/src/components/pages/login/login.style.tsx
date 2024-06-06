import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { hexToRgb } from "../../utils/convertor/hex_to_rgba";

export const LoginContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  width: 30%;
  height: 60%;
  box-shadow: 0px 0px 1rem
    ${({ theme }) => {
      const rgb = hexToRgb(theme.colors.primary);
      return rgb
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`
        : theme.colors.primary;
    }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${({ theme }) => {
      const rgb = hexToRgb(theme.colors.secondary);
      return rgb
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
        : theme.backgrounds.primary;
    }};
`;




