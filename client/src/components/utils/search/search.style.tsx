import styled, { css } from "styled-components";
import { GoSearch } from "react-icons/go";
import { GiSettingsKnobs } from "react-icons/gi";
import { ThemeProps } from "../../../typo/theme/theme";
import { Input } from "../form-elements/form.style";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { MdClear } from "react-icons/md";
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  margin-right: 0rem;
  padding: 1rem;
  /* gap: 1rem; */
`;

export const SearchInputContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 0.2rem solid
    ${({ theme }) => addOpacityToColor(0.2, theme.colors.primary)};
  border-radius: 3rem;
  width: 40vw;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 0rem;
  margin: 0rem;
  margin-left: 4rem;
  padding: 0 1rem;
  position: relative;
`;

export const SearchInput = styled(Input)`
  width: 50rem;
  height: 4rem;
  padding: 0 1rem;
  border: 0.1rem solid ${({ theme }) => theme.backgrounds.primary};
  border-radius: 3rem;
  &:focus {
    border: none;
  }
`;

export const SearchIcon = styled(GoSearch)`
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  cursor: pointer;
`;

const icons_style = css`
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  }
`;
export const FilterIcon = styled(GiSettingsKnobs)`
  ${icons_style}
`;

export const ClearIcon = styled(MdClear)`
  ${icons_style}
`;
