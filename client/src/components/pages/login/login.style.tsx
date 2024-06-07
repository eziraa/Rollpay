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
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  /* border: 1px solid
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)}; */
`;
export const Checkbox = styled.input`
  height: 1.5rem;
  width: 1.5rem;
`;
export const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  padding: 0rem 1rem;
`;
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  font-size: 1.2rem;
  position: absolute;
  padding-left: 0.5rem;
  /* right: 1rem; */
  /* font-weight: 500; */

  &:hover {
    color: ${({ theme }) => addOpacityToColor(0.5, theme.colors.link)};
    cursor: pointer;
    text-decoration: underline blue;
    transition: all 0.3s;
  }
`;
export const LinkContainer = styled.div`
  position: relative;
  width: 30rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-items: left; */
`
