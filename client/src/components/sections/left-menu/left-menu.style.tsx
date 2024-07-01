import styled, { css } from "styled-components";
import { FcHome } from "react-icons/fc";
import { MdAttachMoney } from "react-icons/md";

import { PiUsersFourThin } from "react-icons/pi";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const LeftMenuContainer = styled.div<ThemeProps>`
  width: 14vw;
  height: 100%;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.07, theme.buttons.secondary)};
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  color: ${({ theme }) => theme.colors.secondary};
  border-right: 0.3rem solid ${({ theme }) => theme.colors.secondary};
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 3.5rem;
  font-weight: 700;
  width: 100%;
  height: 25%;
  letter-spacing: 1px;
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
  width: 90%;
  padding: 1rem;
  margin: 0 1rem;
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

export const SalaryIcon = styled(MdAttachMoney)`
  ${Icon}
`;
