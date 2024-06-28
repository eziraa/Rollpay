import styled, { keyframes } from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

const animation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
`;

interface DotProps extends ThemeProps {
  size: number;
}
export const Dot = styled.div<DotProps>`
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  margin: 0 4px;
  &:nth-child(1) {
    animation: ${animation} 2s infinite;
  }
  &:nth-child(2) {
    animation: ${animation} 2s 0.5s infinite;
  }
  &:nth-child(3) {
    animation: ${animation} 2s 1s infinite;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 100%;
  width: 100%;
`;

export const ThreeDots = ({ size }: { size: number }) => {
  return (
    <DotsContainer>
      <Dot size={size} />
      <Dot size={size} />
      <Dot size={size} />
    </DotsContainer>
  );
};
