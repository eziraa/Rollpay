import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add_opacity_color";

export const LoginContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  width: 30%;
  height: 60%;
  box-shadow: 0px 0px 1rem
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
`;




