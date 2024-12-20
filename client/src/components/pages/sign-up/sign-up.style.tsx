import { css } from "styled-components";
import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import "react-phone-input-2/lib/style.css";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { LinkContainer } from "../login/login.style";


const Text = css`
  color: ${({ theme }) => theme.colors.primary};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
`;

export const SignUpPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;
export const SignUpContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  width: 35rem;
  height: auto;
  box-shadow: 0px 0.4rem 2rem
    ${({ theme }) => addOpacityToColor(0.16, theme.colors.primary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  padding: 6rem 1rem;
  border-radius: 1rem;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Title = styled.h1`
  ${Text}
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  ${Text}
  margin: 0 1rem;
  font-size: 1.5rem;
  font-weight: 400;
  padding-left: 1rem;
  color: #ef3131;
  max-width: 20rem;
`;

export const LogInLink = styled(LinkContainer)`
  margin-bottom: 0rem;
`
