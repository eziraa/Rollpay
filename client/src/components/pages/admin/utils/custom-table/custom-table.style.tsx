import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";

export const CustomTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0;
  border: none;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.backgrounds.primary};
    padding: 0.5rem;
    text-align: left;
    font-size: 1.4rem;
    vertical-align: middle;
  }
  tr:first-child {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.095, theme.colors.primary)};
    line-height: 2;
    background-color: ${({ theme }) => theme.backgrounds.secondary};
  }
  tr:nth-child(even) {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.095, theme.colors.primary)};
  }
`;
