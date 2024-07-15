import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";

export const BlurredIcon = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  padding: 0.4rem;
  &:hover {
    color: ${({ theme }) => theme.backgrounds.primary};
    transition: color 0.3s ease;
  }
`;
