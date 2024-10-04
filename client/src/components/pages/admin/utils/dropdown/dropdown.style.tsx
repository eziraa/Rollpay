import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";

export const Select = styled.select`
  width: fit-content;
  min-width: 20rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  outline: none;
  background: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  flex: 1;
`;

export const Option = styled.option`
  line-height: 2;
  padding: 1rem;
`;

export const Label = styled.label`
  font-size: 1.3rem;
  display: block;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
`;
