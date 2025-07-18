import styled from "styled-components";
import { addOpacityToColor } from "../../../utils/convertor/add-opacity-color";
import {
  column_template_al_center,
  column_template_al_end,
  column_template_al_start,
  column_template_js_center,
  column_template_js_end,
  column_template_js_start,
  row_template_al_center,
  row_template_al_end,
  row_template_js_center,
  row_template_js_space_between,
  row_template_js_start,
} from "../../../utils/flexbox/flex-box";
import { place_center } from "../../../utils/flexbox/place-center.style";
import { mini_shadow } from "../../../utils/shadows/shadows.style";
import { ThemeProps } from "../../../../typo/theme/theme";
import { NormalBlurredText } from "../../../utils/titles/titles";
import { custom_vertical_scroll_bar } from "../../../utils/scroll-bar/scroll-bar";

export const DashboardContainer = styled.div`
  display: flex;
  ${column_template_al_start}
  justify-content: center;
  height: 100%;
  padding: 1rem;
  padding-top: 2rem;
  ${custom_vertical_scroll_bar}
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
    addOpacityToColor(0.02, theme.colors.primary)};
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
  flex: 1;
  /* ${mini_shadow} */
`;

export const Card = styled.div<ThemeProps>`
  ${column_template_js_center};
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
  width: fit-content;
`;
export const CardBody = styled.div`
  ${row_template_js_space_between};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  width: 100%;
  padding: 0 1rem;
`;

export const DataBox = styled.div`
  ${column_template_al_end}
  width: 100%;
  justify-content: end;
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

export const BarGraphContainer = styled.div`
  ${place_center};
  ${mini_shadow};
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.02, theme.colors.primary)};
  margin: 1rem;
  padding: 1rem 6rem;
  height: 100%;
`;

export const BarGraphContent = styled.div`
  ${column_template_al_center}
  ${column_template_js_start}
  padding: 1rem;
  border-radius: 1rem;
  height: 100%;
  width: 100%;
`;

export const BarGraphHeader = styled.div`
  ${row_template_js_space_between}
  align-items: center;
  width: 100%;
`;

export const GrpahKeyContainer = styled.div`
  ${row_template_js_start}
  align-items: center;
  gap: 1rem;
  width: 100%;
`;
export const GraphKey = styled.div`
  ${row_template_js_start}
  width: fit-content;
  gap: 0.5rem;
  align-items: center;
`;

export const GraphContainer = styled.div`
  ${place_center};
  padding: 2rem;
  gap: 2.5rem;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  position: relative;
  width: 100%;
`;

export const VerticalAxis = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  border-right: 2px solid
    ${({ theme }) => addOpacityToColor(0.07, theme.colors.primary)};
  height: 100%;
`;

export const AxisKey = styled.div`
  ${place_center}
  padding: 1rem;
`;

export const HorizontalAxis = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
`;

interface AxisProps extends ThemeProps {
  colors: string[];
}

export const DataVerticalAxis = styled.div`
  ${column_template_js_end};
  align-items: end;
  height: 100%;
  width: fit-content;
`;
export const BarsContainer = styled.div<AxisProps>`
  ${row_template_al_end};
  align-items: end;
  height: 100%;
  width: fit-content;
  position: relative;
  cursor: pointer;
  padding-bottom: 1.5rem;
  &:hover {
    .toast {
      display: flex;
    }
    /* .data {
      ${({ colors }) => {
      return colors.map(
        (color, index) => `&:nth-child(${index + 1}){
      background-image: linear-gradient(to top, white, ${color});}`
      );
    }}
    } */
  }
`;

export const DataHorizontalAxis = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  width: 100%;
  gap: 2rem;
  &:first-child {
    border-bottom: 0.1rem solid
      ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  }
`;

interface DataProps extends ThemeProps {
  height: number;
  color: string;
}

export const GraphData = styled.div<DataProps>`
  ${place_center};
  width: 1rem;
  height: ${({ height }) => height}rem;
  border-radius: 1rem 1rem 0 0;

  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.backgrounds.primary},
    ${({ color }) => color}
  );
  &:hover {
    background-image: linear-gradient(
      to top,
      ${({ theme }) => theme.backgrounds.primary},
      ${({ color }) => color}
    );
  }
`;

export const GraphFooter = styled.div`
  ${row_template_js_center}
  align-items: flex-start;
  transform: translateY(24deg);
  width: 100%;
  height: fit-content;
  margin-left: 3rem;
  gap: 1rem;
  margin-top: 2.5rem;
`;

export const BlurredText = styled(NormalBlurredText)`
  transform: rotate(-45deg);
  width: 5rem;
  text-align: end;
`;

export const ToastContainer = styled.div`
  ${place_center}
  padding: 1rem;
  ${column_template_js_center};
  align-items: flex-start;
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.9, theme.colors.primary)};
  color: ${({ theme }) => theme.backgrounds.primary} !important;
  position: absolute;
  left: 105%;
  bottom: 50%;
  display: none;
  width: 10rem;
  gap: 0.5rem;
  z-index: 10;
`;

export const ToastRow = styled.div`
  ${row_template_js_start}
  align-items: center;
  gap: 1rem;
`;

export const LimitContainer = styled.div`
  ${place_center}
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 3.5rem;
  right: 0;
  height: 100%;
  width: 92%;
`;

export const BrokenLine = styled.div`
  width: 100%;
  height: 3.2rem;
  border-bottom: 1px #434343e7 dashed;
`;

export const Image = styled.img`
  width: 8rem;
  height: 6rem;
  object-fit: cover;
  display: block;
`;