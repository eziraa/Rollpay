import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
export const HeaderContainer = styled.div<ThemeProps>`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  top: 0;
`;

export const HeaderTitle = styled.h1<ThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
