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

export const NormalBlurredText = styled.h1`
  font-size: 1.2rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  letter-spacing: 0.5px;
`;

export const SmallBlurredText = styled.h1`
  font-size: 1rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  letter-spacing: 0.3px;
`;

export const LargeText = styled(BlurredText)`
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
`;
  

