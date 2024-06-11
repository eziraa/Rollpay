import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { ThemeProps } from "../../../typo/theme/theme";
import { Input } from "../form_elements/form.style";
export const SearchContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* gap: 0.4rem; */
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  width: 50rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 0rem;
  margin: 0rem;
`;

export const SearchInput = styled(Input)`
  width: 50rem;
  height: 4rem;
  padding: 0 1rem;
  border: none;
  &:focus {
    border: none;
  }
`;

// export const Input = styled.input`
//   width: 100%;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   border: 1px solid ${({ theme }) => theme.colors.secondary};
//   background-color: ${({ theme }) => theme.backgrounds.primary};
//   outline: none;
//   color: ${({ theme }) => theme.colors.primary};
//   &:focus {
//     border: 1px solid ${({ theme }) => theme.colors.primary};
//   }
// `;



export const SearchIcon = styled(GoSearch)`
  margin-left: 1rem;
  color: #747272;
  font-size: 2rem;
  cursor: pointer;
`;
