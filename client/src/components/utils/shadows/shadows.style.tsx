import { css } from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const mini_shadow = css`
  box-shadow: 0.1rem 0.1rem 1rem
      ${({ theme }) => addOpacityToColor(0.1, theme.buttons.primary)},
    0.1rem 0.1rem 1rem
      ${({ theme }) => addOpacityToColor(0.1, theme.buttons.primary)},
    0.1rem 0.1rem 1rem
      ${({ theme }) => addOpacityToColor(0.1, theme.buttons.primary)},
    0.1rem 0.1rem 1rem
      ${({ theme }) => addOpacityToColor(0.1, theme.buttons.primary)};
`;
