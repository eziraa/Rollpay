import { ThemeProps } from "../../../typo/theme/theme";
import { Button } from "../../utils/form-elements/form.style";
import styled from "styled-components";

import {
  body,
  container,
  sub_header_css,
} from "../../utils/pages-utils/containers.style";

export const EmployeesListContainer = styled.div<ThemeProps>`
  ${container}
  width: auto;
  border: 1px solid red;
`;

export const EmployeesListBody = styled.div<ThemeProps>`
  ${body}
`;

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
  margin: 0rem;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.primary};
`;

export const EmpsDisplayerHeader = styled.div`
  ${sub_header_css}
  width: 100%;
`;

export const EmployeesListHeader = styled.div`
  ${sub_header_css}
  width: 100%;
  justify-content: space-between;
`;

export const Body = styled.div<ThemeProps>`
  padding: 0rem;
  margin-right: 2rem;
  width: 100%;
  height: 100%;
`;

export const AddButton = styled(Button)`
  width: fit-content;
  justify-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;
`;
