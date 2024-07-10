import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex: 3.8;
  gap: 1rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
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
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 0.5rem solid;
  border-bottom-color: ${({ active, theme }) =>
    active ? theme.buttons.primary : "transparent"};

  &:hover {

    color: ${({ theme }) => theme.buttons.primary};
    font-weight: 500;
  }
`;
