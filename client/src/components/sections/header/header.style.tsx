import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import profile from "../../../assets/profile.png";
export const HeaderContainer = styled.div<ThemeProps>`
  width: 100vw;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 0 2rem;
`;

export const HeaderTitle = styled.h1<ThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const ProfileContainer = styled.div<ThemeProps>`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  gap: 1rem;
`;

export const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  padding: 0.5rem;
  background: url(${profile}), linear-gradient(90deg, #60565596, #6866619d);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;