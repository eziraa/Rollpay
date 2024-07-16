import styled from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { GoSearch } from "react-icons/go";
import { ThemeProps } from "../../../typo/theme/theme";
import { Input} from "../../utils/form-elements/form.style";
import { CustomTable } from "../../utils/custom-table/custom-table";
import { custom_vertical_scroll_bar } from "../../utils/scroll-bar/scroll-bar";
import {
  MainContainer,
  body,
  container,
} from "../../utils/pages-utils/containers.style";
import { Label } from "../../sections/profile/profile.style";
import { Icon } from "../../utils/profile/employee-profile.style";

export const EmployeesSalaryContainer = styled.div<ThemeProps>`
  ${container}
`;

export const EmployeesSalarytBody = styled.div<ThemeProps>`
  ${body}
`;
export const SalaryContainer = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 90vh;
  position: relative;
  padding: 2rem;
  width: auto;
  overflow-x: scroll;
`;

export const SalaryTitle = styled.h1`
  position: absolute;
  left: 25rem;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => addOpacityToColor(0.65, theme.colors.primary)};
`;

export const SearchContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 0.1rem solid ${({ theme }) => theme.colors.primary};
  border-radius: 3rem;
  width: 40rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 0rem;
  margin: 0rem 2rem 0rem 1rem;
  padding: 0 1rem;
`;

export const SearchInput = styled(Input)`
  width: 50rem;
  height: 4rem;
  padding: 0 1rem;
  border-radius: 3rem;

  border: 0.1rem solid ${({ theme }) => theme.backgrounds.primary};
  outline: none;
  &:focus {
    border: none;
  }
`;

export const SearchIcon = styled(GoSearch)`
  margin-left: 1rem;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  font-size: 3rem;
  cursor: pointer;
`;

export const SalaryTable = styled(CustomTable)`
  ${custom_vertical_scroll_bar};
  width: fit-content;
  padding: 7px;
  height: 62vh;
  display: block;
  margin-right: 1rem;
`;

export const ExportButton = styled.div`
  width: fit-content;
  display: flex;
  background-color: ${({ theme }) => theme.buttons.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  align-items: center;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;
export const ExportLabel = styled(Label)`
  font-size: 1.5rem;
  margin-left: 1rem;
`;

export const ExportIcon = styled(Icon)`
  margin: 0rem;
  padding: 0rem;
  height: 2rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  background-color: transparent;
  border-radius: 0rem;
`;

export const StartPaymentBtn = styled.button`
  padding: 0.65rem 1rem;
  border-radius: 0.6rem;
  font-size: 1.6rem;
  background-color: ${({ theme }) => theme.buttons.primary};
  border: none;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
`;
