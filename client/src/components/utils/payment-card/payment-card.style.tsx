import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { custom_scroll_bar } from "../scroll-bar/scroll-bar";

export const PaymentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  gap: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  background-color: #f9f9f9;
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
  ${custom_scroll_bar}
`;

export const PaymentRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr) 2fr 1fr;
  padding: 0.5rem 0;
  margin: 0;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.secondary};
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
