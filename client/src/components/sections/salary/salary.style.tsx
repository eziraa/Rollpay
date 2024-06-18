import styled from "styled-components";
import { custom_scroll_bar } from "../../utils/scroll-bar/scroll-bar";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const SalaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 90vh;
  width: 100%;
  ${custom_scroll_bar}
`;

export const SalaryTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${({ theme }) => addOpacityToColor(0.65, theme.colors.primary)};
`;
