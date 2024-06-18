import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { CustomLink } from "../../pages/login/login.style";
import { Button } from "../../utils/form-elements/form.style";

interface Props {
  clicked: boolean;
}
export const ModalContainer = styled.div<Props>`
  width: 100vw;
  height: 90vh;
  top: 10vh;
  left: 0;
  position: absolute;
  z-index: 200;
  display: ${(props) => (props.clicked ? "" : "none")};
`;

export const Modal = styled.div<ThemeProps>`
  width: 20rem;
  height: 14rem;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  top: 0.1rem;
  right: 0.1rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  border-radius: 1rem;
`;
export const ResetLink = styled(CustomLink)<ThemeProps>`
  font-size: 1.5rem;
  margin: 0 2.7rem;
`;
export const Label = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.backgrounds.primary};
  font-size: 1.5rem;
`;

export const LogoutButton = styled(Button)<ThemeProps>`
  width: 9rem;
  margin: 0.5rem 5rem;


`;
