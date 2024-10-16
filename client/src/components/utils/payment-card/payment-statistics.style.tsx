import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { custom_vertical_scroll_bar } from "../scroll-bar/scroll-bar";

export const PaymentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-width: 100%;
  min-height: 30rem;
  gap: 1rem;
  border-radius: 1rem;
  border: 0.3rem solid #63edaa;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.89, theme.backgrounds.primary)};
`;

export const PaymentCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const PaymentTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  padding: 0 1rem;
  max-height: 40vh;
  ${custom_vertical_scroll_bar}
  .header {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.1, theme.colors.primary)};
  }
`;

export const PaymentRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5rem 0;
  margin: 0;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.06, theme.colors.primary)};
  }
`;

export const PaymentCell = styled.div`
  padding: 0.5rem;
  font-size: 1.2rem;
`;

export const PaymentDate = styled.div`
  font-weight: bold;
`;

export const PaymentAmount = styled.div`
  font-weight: bold;
  text-align: right;
`;

export const PostiveText = styled.p`
  color: #09b255;
`;

export const NegativeText = styled.p`
  color: #ff9822;
`;
