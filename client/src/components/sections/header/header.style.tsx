import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import Placeholder from "../../../assets/placeholde.jpg";
export const HeaderContainer = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 1rem;
  margin: 0;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.secondary};
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

interface Props {
  profile: string;
}
export const ProfileImage = styled.img<Props>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  padding: 0rem;
  background: ${(props) =>
      props.profile ? `url(${props.profile})` : `url(${Placeholder})`},
    linear-gradient(90deg, #60565596, #6866619d);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  /* transition: all 0.3s ease-in-out; */
  /* &:hover {
    transform: scale(1.1);
  } */
`;

export const WelcomeMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const WelcomeMessageName = styled.h1<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
`;




