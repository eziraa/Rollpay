import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { ThemeProps } from "../../../typo/theme/theme";
import { Input } from "../form-elements/form.style";
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  margin: 1rem;
  padding: 1rem;
  gap: 1rem;
`;

export const SearchInputContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3rem;
  width: 40rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 0rem;
  margin: 0rem;
  margin-left: 4rem;
  padding: 0 1rem;
`;

export const SearchInput = styled(Input)`
  width: 50rem;
  height: 4rem;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.backgrounds.primary};
  border-radius: 3rem;
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
