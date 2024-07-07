import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const Button = styled.button<ThemeProps>`
  width: 30%;
  height: 3.5rem;
  margin: 1rem 14rem;
  font-size: 1.5rem;
  border-radius: 0.7rem;
  border: none;
  background-color: ${({ theme }) => theme.buttons.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
    cursor: pointer;
  }
`;
