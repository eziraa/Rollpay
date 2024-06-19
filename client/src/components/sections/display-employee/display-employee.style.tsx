import { ThemeProps } from "../../../typo/theme/theme";
import { Button } from "../../utils/form-elements/form.style";
import styled from "styled-components";

export const EmployeeDisplayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Title = styled.h1<ThemeProps>`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 1rem;
  position: relative;
`;

export const Body = styled.div<ThemeProps>`
  padding: 0rem;
`;

export const AddButton = styled(Button)`
  width: fit-content;
  justify-self: end;
  display: block;
  position: absolute;
  right: 2rem;
`;
