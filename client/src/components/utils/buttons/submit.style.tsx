import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const Button = styled.button<ThemeProps>`
  width: 30%;
  height: 35px;
  margin: 10px 140px;
  color: ${({ theme }) => theme.buttonColor.primary};
  font-size: 15px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.buttonColor.secondary};
  border: none;
  &:hover {
    color: ${({ theme }) => theme.buttonColor.primaryHover};
    background-color: ${({ theme }) => theme.buttonColor.secondaryHover};
  }
`;
