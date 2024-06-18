import { css } from "styled-components";
import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import "react-phone-input-2/lib/style.css";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

const Text = css`
  color: ${({ theme }) => theme.colors.primary};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
`;
export const SignUpContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  width: 23%;
  height: auto;
  box-shadow: 0px 0px 1rem
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  padding: 6rem 1rem;
  border-radius: 1rem;
  /* border: 1px solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)}; */

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Title = styled.h1`
  ${Text}
  font-size: 30px;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  ${Text}
  margin: 0px 10px;
  font-size: 15px;
  font-weight: 400;
  padding-left: 10px;
  color: #ef3131;
`;
