import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";

export const Select = styled.select`
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  outline: none;
  background: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  flex: 1;
`;

export const Option = styled.option`
  padding: 0.5rem;
  line-height: 2;
`;

export const Label = styled.label`
  font-size: 1.3rem;
  display: block;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
`;
