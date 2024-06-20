import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { CustomLink } from "../../pages/login/login.style";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
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
  height: 13rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 1.5rem;
  top: 5.5rem;
  right: 2rem;

  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  border-radius: 0.5rem;
  border-bottom: 1px solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.5),
    -5px 0 5px -5px rgba(0, 0, 0, 0.5), 0 5px 5px -5px rgba(0, 0, 0, 0.5),
    0 -5px 5px -5px rgba(0, 0, 0, 0.5);
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
  cursor: pointer;
`;

export const LogoutButton = styled(Button)<ThemeProps>`
  width: 9rem;
  margin: 0.5rem 5rem;
`;

export const IconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
  margin-right: 1rem;
  font-size: 2rem;
`;
export const ItemContainer = styled.div`
  display: flex;
  margin: 0.2rem;
`;
