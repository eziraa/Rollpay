import styled from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { GoSearch } from "react-icons/go";
import { ThemeProps } from "../../../typo/theme/theme";
import { Input } from "../../utils/form-elements/form.style";
import { CustomTable } from "../../utils/custom-table/custom-table";
import { custom_scroll_bar } from "../../utils/scroll-bar/scroll-bar";
import { Button } from "../see-employee/see-employee.style";

export const SalaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 90vh;
  position: relative;
  overflow-x: hidden;
`;

export const SalaryTitle = styled.h1`
  position: absolute;
  left: 25rem;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${({ theme }) => addOpacityToColor(0.65, theme.colors.primary)};
`;

export const SearchContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3rem;
  width: 40rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 0rem;
  margin: 1rem;
  padding: 0 1rem;
`;

export const SearchInput = styled(Input)`
  width: 50rem;
  height: 4rem;
  padding: 0 1rem;
  border-radius: 3rem;

  border: 1px solid ${({ theme }) => theme.backgrounds.primary};
  outline: none;
  &:focus {
    border: none;
  }
`;

export const SearchIcon = styled(GoSearch)`
  margin-left: 1rem;
  color: #747272;
  font-size: 2rem;
  cursor: pointer;
`;

export const SalaryTable = styled(CustomTable)`
  ${custom_scroll_bar};
  width: 100%;
  height: 78%;
  display: block;
`;

export const ExportButton = styled(Button)`
  width: 7rem;
  margin-left: 1rem;
`
