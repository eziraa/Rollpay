import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const BlurredText = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  letter-spacing: 1px;
`;

export const MidBlurredText = styled(BlurredText)`
  font-size: 1.4rem;
`;
