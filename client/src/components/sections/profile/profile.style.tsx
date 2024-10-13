import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { CustomLink } from "../../pages/login/login.style";
import { Button } from "../../utils/form-elements/form.style";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const ModalContainer = styled.div`
  height: 100vh;
`;

export const Modal = styled.div<ThemeProps>`
  width: 20rem;
  height: 14rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  top: 5.5rem;
  right: 2rem;
  position: absolute;
  display: flex;
  padding: 1rem 0;
  flex-direction: column;
  justify-content: first baseline;
  border-radius: 0.5rem;
`;

export const ResetLink = styled(CustomLink)<ThemeProps>`
  font-size: 1.5rem;
  padding: 0 0.5rem;

  a:link {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  a:visited {
    color: ${({ theme }) => theme.colors.primary};
  }

  a:active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const Label = styled.div<ThemeProps>`
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
  flex: 1;
`;

export const LogoutButton = styled(Button)<ThemeProps>`
  width: 9rem;
  margin: 0.5rem 5rem;
`;

export const IconContainer = styled.div<ThemeProps>`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ItemContainer = styled.div<ThemeProps>`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    color: ${({ theme }) => theme.buttons.primary};
    background-color: ${({ theme }) =>
      addOpacityToColor(0.1, theme.buttons.primary)};
    a {
      color: ${({ theme }) => theme.buttons.primary} !important;
    }
  }
`;
