import styled from "styled-components";
import { FaMoon } from "react-icons/fa";
import { PiSun } from "react-icons/pi";
import { ThemeProps } from "../../typo/theme/theme";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { lightTheme } from "../../theme/theme";
const ToggleContainer = styled.div<ThemeProps>`
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 3rem;
`;

export const Toggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <ToggleContainer onClick={toggleTheme}>
      {theme === lightTheme ? <FaMoon /> : <PiSun />}
    </ToggleContainer>
  );
};
