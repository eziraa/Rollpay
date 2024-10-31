import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const Caption = styled.th`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
  text-align: left;
  padding: 1rem;
  width: 15rem;
`;
