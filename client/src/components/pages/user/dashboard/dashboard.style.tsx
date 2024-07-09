import styled from "styled-components";
import { addOpacityToColor } from "../../../utils/convertor/add-opacity-color";
import {
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

export const CardsContainer = styled.div`
  ${row_template_al_center}
  gap: 2rem;
  padding: 1rem;
`;
export const DashBoardCard = styled.div`
  ${column_template_al_start};
  justify-content: center;
  border-radius: 1rem;
  padding: 2rem;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.06, theme.colors.primary)};
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

export const CardBody = styled.div`
  ${row_template_al_center};
  justify-content: center;
  gap: 1rem;
`;

export const DataBox = styled.div`
  ${column_template_al_start}
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
    addOpacityToColor(0.9, theme.backgrounds.primary)};
  padding: 1rem;
  font-size: 2.5rem;
`;
