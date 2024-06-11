import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { Button } from "../../utils/form_elements/form.style";

export const MainContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-st;
  width: 100%;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;

export const Title = styled.h1<ThemeProps>`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textPrimary};
`;

export const MainHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`;

export const ListBody = styled.div<ThemeProps>`
  margin: 1rem;
  padding: 0rem;
  background-color: ${({ theme }) => theme.backgrounds.secondary};
`;

export const AddButton = styled(Button)`
  width: 5rem;
`;
