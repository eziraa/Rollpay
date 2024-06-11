import styled, { css } from "styled-components";
import { FcHome } from "react-icons/fc";
import { MdAttachMoney } from "react-icons/md";

import { PiUsersFourThin } from "react-icons/pi";
import { ThemeProps } from "../../../typo/theme/theme";

export const LeftMenuContainer = styled.div<ThemeProps>`
  width: 20rem;
  height: 92vh;
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  padding-top: 2vh;
  z-index: 100;
  color: ${({ theme }) => theme.colors.secondary};
  border-right: 0.3rem solid ${({ theme }) => theme.colors.secondary};
`;

export const MenuItem = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem;
  text-align: left;
  padding-left: 2vw;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
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

export const SalaryIcon = styled(MdAttachMoney)`
  ${Icon}
`;
