import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add_opacity_color";

export const LoginContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.backgrounds.primary};
  width: 25%;
  height: 60%;
  box-shadow: 0px 0px 1rem
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  /* border: 1px solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)}; */
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => addOpacityToColor(0.5, theme.colors.link)};
    cursor: pointer;
    text-decoration: underline blue;
    transition: all 0.3s;
  }
`;




