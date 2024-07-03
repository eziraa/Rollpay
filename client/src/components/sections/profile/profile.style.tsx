import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { CustomLink } from "../../pages/login/login.style";
import { Button } from "../../utils/form-elements/form.style";

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0vh;
  left: 0;
  position: absolute;
  z-index: 200;
`;

export const Modal = styled.div<ThemeProps>`
  width: 20rem;
  height: 17rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 1.5rem;
  top: 5.5rem;
  right: 2rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  border-radius: 0.5rem;
  box-shadow: 5px 0 5px -5px ${({ theme }) => theme.colors.primary},
    -5px 0 5px -5px ${({ theme }) => theme.colors.primary},
    0 5px 5px -5px ${({ theme }) => theme.colors.primary},
    0 -5px 5px -5px ${({ theme }) => theme.colors.primary};
`;

export const ResetLink = styled(CustomLink)<ThemeProps>`
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-bottom: 0.2rem;
  color: ${({ theme }) => theme.colors.primary};

  a:link {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  a:visited {
    color: ${({ theme }) => theme.colors.primary};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  a:active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const Label = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-top: 0rem;
  cursor: pointer;
  p:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const LogoutButton = styled(Button)<ThemeProps>`
  width: 9rem;
  margin: 0.5rem 5rem;

`;

export const IconContainer = styled.div<ThemeProps>`
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
`;
export const ItemContainer = styled.div`
  display: flex;
  margin: 0.2rem;
  align-items: center;
`;

export const HorizontalLine = styled.hr`
  margin-top: 1rem;
`;
