import styled, { css } from "styled-components";
import { FcHome } from "react-icons/fc";
import { HiUserCircle } from "react-icons/hi";

import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { LuCircleDollarSign } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

export const LeftMenuContainer = styled.div<ThemeProps>`
  width: 14vw;
  height: 100vh;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.07, theme.buttons.secondary)};
  z-index: 100;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */

  color: ${({ theme }) => theme.colors.secondary};
  border-right: 0.3rem solid ${({ theme }) => theme.colors.secondary};
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 1rem; */
  font-size: 3.5rem;
  font-weight: 700;
  width: 100%;
  height: 25%;
  letter-spacing: 1px;
  margin: 0;
  padding: 0;
`;

export const LogoImage = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 50%;
`;

interface MenuItemProps extends ThemeProps {
  active: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem 2rem;
  text-align: left;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  border-bottom: 0.4rem solid transparent;
  background-color: ${({ active }) => (active ? "#98aaa3f8 " : "transparent")};
  border-bottom: 1px solid
    ${({ active }) => (active ? "#10e4c5 " : "transparent")};
`;

export const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 90%;
  margin: 1rem;
  margin-left: 4rem;
  border-radius: 0.5rem;

  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  transition: all 0.5s ease;
  border-left: ${({ theme }) => ` 0.5rem solid ${theme.buttons.primary}`};
`;

interface SubMenuItemProps extends ThemeProps {
  active: boolean;
}

export const SubMenuItem = styled.div<SubMenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 1.6rem;
  /* border-bottom: 0.1rem solid #34343483; */
  /* border-left: ${({ theme, active }) =>
    active ? ` 0.5rem solid ${theme.buttons.primary}` : "transparent"}; */

  background-color: ${({ theme, active }) =>
    active ? theme.buttons.primary : "transparent"};
  color: ${({ theme, active }) =>
    !active ? theme.colors.primary : theme.backgrounds.primary};
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const MenuItemText = styled.h1`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 0.8;
  padding: 0.5rem 0;
  letter-spacing: 1px;
`;

export const Icon = css`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

export const HomeIcon = styled(FcHome)`
  ${Icon}
`;

export const UsersIcon = styled(PiUsersThree)`
  ${Icon}
`;

export const UserIcon = styled(HiUserCircle)`
  ${Icon}
`;

export const SalaryIcon = styled(LuCircleDollarSign)`
  ${Icon}
`;

export const ColapseExpand = styled.div`
  display: flex;
  justify-self: flex-end;
`;
