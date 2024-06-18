import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { CustomLink } from "../../pages/login/login.style";
import { Button } from "../../utils/form-elements/form.style";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

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
  height: 15rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 1rem;
  top: 1rem;
  right: 1rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  border-radius: 1rem;
  border-bottom: 1px solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  box-shadow: 1rem 0rem 1rem -0.5rem ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)},
    -10px 0px 10px -0.5rem
      ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
`;
export const ResetLink = styled(CustomLink)<ThemeProps>`
  font-size: 1.5rem;
  margin: 0.5rem 2.7rem;
`;
export const Label = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  padding: 0.5rem;
`;

export const ShowProfile = styled(Label)`
  padding: 0 4rem;
`;

export const LogoutButton = styled(Button)<ThemeProps>`
  width: 9rem;
  margin: 0.5rem 5rem;
`;
