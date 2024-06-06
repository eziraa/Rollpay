import styled from "styled-components";
import logo from "../../../assets/logo.jpg";
import { ThemeProps } from "../../../typo/theme/theme";
export const LogoContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  gap: 1rem;
`;

export const LogoImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  padding: 0.5rem;
  background: url(${logo}), linear-gradient(90deg, #60565596, #6866619d);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
`;

export const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
`;

