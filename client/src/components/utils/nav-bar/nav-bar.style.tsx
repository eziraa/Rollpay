import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex: 1;
  gap: 1rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  width: fit-content;
`;

interface NavItemProps extends ThemeProps {
  active?: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  padding: 1rem 1rem;
  display: inline-block;
  font-size: 1.7rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  text-align: center;
  color: ${({ active, theme }) =>
    active ? theme.buttons.primary : theme.colors.primary};
  border-bottom: 0.5rem solid;
  border-bottom-color: ${({ active, theme }) =>
    active ? theme.buttons.primary : "transparent"};
  background-color: ${({ active, theme }) =>
    active ? addOpacityToColor(0.1, theme.buttons.primary) : "transparent"};
  &:hover {
    color: ${({ theme }) => theme.buttons.primary};
    background-color: ${({ theme }) =>
      addOpacityToColor(0.1, theme.buttons.primary)};
    font-weight: 500;
  }
`;
