import { css } from "styled-components";
import styled from "styled-components";
import { ThemeProps } from "../../typo/theme/theme";


const Text = css`
  color: ${({ theme }) => theme.colors.primary};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
`;
export const SignUpContainer = styled.div<ThemeProps>`
  height: fit-content;
  width: 25vw;
  border: 0.1rem solid ${({ theme }) => theme.backgrounds.secondary};
  border-radius: 20px;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 0px 0px 1rem black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Form = styled.form<ThemeProps>`
    background-color: ${({ theme }) => theme.backgrounds.primary};

`
export const Title = styled.h1`
  ${Text}
  font-size: 30px;
  margin: 20px 80px;
`;
export const Input = styled.input`
  ${Text}
  height: 20px;
  width: 90%;
  border: 0.1rem solid ${({ theme }) => theme.backgrounds.secondary};
  border-radius: 10px;
  padding: 10px;
  margin: 0px 10px;
  border: 0.1rem solid ${({ theme }) => theme.backgrounds.secondary};
`;
export const InputName = styled.label`
  ${Text}
  margin: 0px 10px;
  font-size: 15px;
  font-weight: 500;
`;
export const InputBox = styled.div`
  margin: 10px 10px 0px 0px;
  width: 90%;
  display: flex;
  flex-direction: column;
`;
export const ErrorMessage = styled.p`
  ${Text}
  margin: 0px 10px;
  font-size: 15px;
  font-weight: 400;
  padding-left: 10px;
  color: #ef3131;
`;
