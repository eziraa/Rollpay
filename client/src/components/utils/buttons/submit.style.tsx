import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add_opacity_color";

export const Button = styled.button<ThemeProps>`
  width: 30%;
  height: 35px;
  margin: 10px 140px;
  font-size: 15px;
  border-radius: 7px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
    cursor: pointer;
  }
`;
