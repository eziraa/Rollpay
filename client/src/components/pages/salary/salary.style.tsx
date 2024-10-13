import styled from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { GoSearch } from "react-icons/go";
import { ThemeProps } from "../../../typo/theme/theme";
import { Input } from "../../utils/form-elements/form.style";
import {
  MainContainer,
  body,
  container,
} from "../../utils/pages-utils/containers.style";
import { Label } from "../../sections/profile/profile.style";
import { Icon } from "../../utils/profile/employee-profile.style";
import { custom_horizontal_scroll_bar} from "../../utils/scroll-bar/scroll-bar";

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
  padding: 2rem;
  width: auto;
`;

export const SalaryTitle = styled.h1`
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

export const SalaryTable = styled.table`
  width: fit-content;
  padding: 0.7rem;
  height: 40rem;
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
  margin-right: 0.5rem;
`;

export const ButtonLabel = styled.p`
  margin-left: 0.5rem;
  display: inline;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: fit-content;
  max-width: 100%;
  ${custom_horizontal_scroll_bar}
`;

export const CustomTable = styled.table`
  /* display: flex;
  flex-direction: column;
  align-items: start; */
  border-collapse: collapse;
  border: none;
  width: 100%;
  width: 120rem;
  margin: 0;
`;

export const Caption = styled.th`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
  text-align: left;
  padding: 1rem;
  width: 15rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const TableHeader = styled.tr<ThemeProps>`
  width: fit-content;
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.table.header};
  color: ${({ theme }) => theme.colors.primary};
  /* font-size: 1.4rem; */
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: row;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const HeaderTitle = styled.th`
  /* font-size: 1.4rem; */
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  display: flex;
  padding: 1rem;
  width: fit-content;
  justify-self: center;
`;

export const Vertical = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableRow = styled.tr<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  &:nth-child(even) {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.4, theme.table.tableRow)};
  }

  &:hover {
    background-color: ${({ theme }) => theme.table.tableRowHover};
  }
`;

export const TableData = styled.td`
  /* font-size: 1.4rem; */
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  padding-left: 0.5rem;
  line-height: 2.5;
`;
