import styled from "styled-components";
import { LoginContainer } from "../../pages/login/login.style";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const ForgotPasswordContainer = styled(LoginContainer)`
  padding: 4rem 2rem;
  height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  box-shadow: 0px 0px 1rem
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
`;

export const ForgotPasswordContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
