import styled from "styled-components";
import { addOpacityToColor } from "../../../utils/convertor/add-opacity-color";
import {
  column_template_al_center,
  column_template_al_start,
  row_template_al_center,
  row_template_js_start,
} from "../../../utils/flexbox/flex-box";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
`;

export const DashBoardTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
`;

export const DashBoardCard = styled.div`
  ${column_template_al_start};
  justify-content: center;
  border-radius: 1rem;
  box-shadow: 0 0 1rem ${({ theme }) => theme.colors.primary} 0 0 1rem
    ${({ theme }) => theme.colors.primary} 0 0 1rem
    ${({ theme }) => theme.colors.primary} 0 0 1rem
    ${({ theme }) => theme.colors.primary};
`;

export const CardBody = styled.div`
  ${row_template_al_center};
  justify-content: center;
  gap: 1rem;
`;

export const DataBox = styled.div`
  ${column_template_al_center}
  justify-content: center;
  gap: 1rem;
`;

export const CardFooter = styled.div`
  ${row_template_js_start}
  align-items: center;
  letter-spacing: 0.1rem;
  font-size: 1.4rem;
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
  font-weight: 400;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.3, theme.backgrounds.primary)};
  padding: 1rem;
`;
