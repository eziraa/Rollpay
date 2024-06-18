import styled, { keyframes } from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const SpinnerContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  position: relative;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;
interface SpinnerProps {
  length: number | undefined;
}
export const Spinner = styled.div<SpinnerProps>`
  border: ${({ length }) => length ?? 16}px solid
    ${({ theme }) => theme.backgrounds.secondary};
  border-radius: 50%;
  border-top: ${({ length }) => length ?? 16}px solid transparent;
  width: 120px;
  height: 120px;
  animation: ${spin} 1s ease-in-out infinite;

`;