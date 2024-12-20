import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import styled from "styled-components";
import { Label } from "../edit-employee/edit-employee.style";
import { custom_vertical_scroll_bar } from "../../utils/scroll-bar/scroll-bar";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const DashboardContainer = styled.div`
  display: flex;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  flex: 1;
  width: 100%;
  row-gap: 2rem;
  padding: 3rem;
  align-items: flex-start;
  ${custom_vertical_scroll_bar};
`;

export const DashboardTitle = styled.h1`
  text-align: right;
  width: 100%;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
`;

export const DashboardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
`;

export const DashboardBodyRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  column-gap: 1rem;
  padding: 0rem;
  margin-bottom: 2rem;
`;
export const StatContainer = styled.div`
  display: flex;
  justify-content: stretch;
  gap: 2rem;
  width: 100%;
  padding: 2rem 0;
  align-items: flex-start;
  h2 {
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  }
`;
export const StatCard = styled.div`
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.5rem 1rem
    ${({ theme }) => addOpacityToColor(0.23, theme.buttons.primary)};
  background-color: ${({ theme }) =>
    addOpacityToColor(0.85, theme.backgrounds.primary)};
`;

export const CardRowTemplate = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 30rem;
`;

export const CardColumnTemplate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Text = styled(Label)`
  padding: 0;
  font-size: 2rem;
`;

export const IncreaseIcon = styled(IoIosArrowRoundUp)`
  font-size: 2.4rem;
  color: #04874a;
`;

export const DecreaseIcon = styled(IoIosArrowRoundDown)`
  font-size: 2.4rem;
  color: #ff5722;
`;
