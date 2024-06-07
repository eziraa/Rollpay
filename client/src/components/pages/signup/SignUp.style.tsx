import { css } from "styled-components";
import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "react-phone-input-2/lib/hig.css";

const Text = css`
  color: ${({ theme }) => theme.colors.primary};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
`;
export const SignUpContainer = styled.div<ThemeProps>`
  height: auto;
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
`;
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
  border: 0.1rem solid ${({ theme }) => theme.backgrounds.secondary};
`;
export const ToggleIcon = styled.div`
  display: inline-block;
  right: -1rem;
  top: 55%;
  transform: translateY(-50%);
  position: absolute;

  background-color: transparent;
  cursor: pointer;
`;

export const PasswordContainer = styled.div`
  position: relative;

  width: 90%;
  input {
    ${Text}
    height: 20px;
    width: 100%;
    border: 0.1rem solid ${({ theme }) => theme.backgrounds.secondary};
    border-radius: 10px;
    padding: 10px;
    /* margin: 0px 10px; */
    border: 0.1rem solid ${({ theme }) => theme.backgrounds.secondary};
  }
`;
export const InputName = styled.label`
  ${Text}
  margin: 0px 10px;
  font-size: 15px;
  font-weight: 500;
`;
export const InputBox = styled.div`
  margin: 10px;
  width: 90%;
  height: auto;
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

export const PhoneNumberInput = styled(PhoneInput)`
  .react-tel-input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 2px solid #435656;
  }

  .react-tel-input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 2px solid #435656;
  }

  .react-tel-input .country-list .country {
    width: 150%;
  }
`;
