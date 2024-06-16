import styled from "styled-components";
import { FaMoon } from "react-icons/fa";
import { PiSun } from "react-icons/pi";
import { ThemeProps } from "../../../typo/theme/theme";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/theme-context";
import { lightTheme } from "../../../theme/theme";
import { addOpacityToColor } from "../convertor/add-opacity-color";
const ToggleContainer = styled.div<ThemeProps>`
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  padding-top: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 2rem;
  &:hover {
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  }
`;

export const Toggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <ToggleContainer onClick={toggleTheme}>
      {theme === lightTheme ? <FaMoon /> : <PiSun />}
    </ToggleContainer>
  );
};
