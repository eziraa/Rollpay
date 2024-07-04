import styled, { css } from "styled-components";
import { FcHome } from "react-icons/fc";
import { HiUserCircle } from "react-icons/hi";

import { PiUsersFourThin } from "react-icons/pi";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { MdAttachMoney } from "react-icons/md";

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
  transition: all 0.5s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  border-bottom: 0.4rem solid transparent;
  background-color: ${({ active }) => (active ? "#98aaa3f8 " : "transparent")};
  border-bottom-color: ${({ active }) => (active ? "#10e4c5 " : "transparent")};
`;

export const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
`;

interface SubMenuItemProps extends ThemeProps {
  active: boolean;
}

export const SubMenuItem = styled.div<SubMenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  padding-left: 3rem;
  text-align: left;
  font-size: 1.6rem;
  border-left: 0.5rem solid #3bf4adf8;
  border-bottom: 0.1rem solid #bfbfbff8;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.5s ease;
  background-color: ${({ active }) => (active ? "#3BF4ADF8 " : "transparent")};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
    border-left-color: #bfbfbff8;
  }
`;
export const MenuItemText = styled.h1`
  font-size: 1.6rem;
  font-weight: 400;
`;

export const Icon = css`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

export const HomeIcon = styled(FcHome)`
  ${Icon}
`;

export const UsersIcon = styled(PiUsersFourThin)`
  ${Icon}
`;

export const UserIcon = styled(HiUserCircle)`
  ${Icon}
`;


export const SalaryIcon = styled(MdAttachMoney)`
  ${Icon}
`;
