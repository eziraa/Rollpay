import styled, { css } from "styled-components";

export const MonthCardContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
`;

export const MonthHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const MonthCardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
`;

export const MonthRowTemplate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  gap: 1rem;
  font-size: 1.3rem;
`;

export const MonthColumnTemplate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  p {
    font-size: 1.2rem;
    color: #666;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const MonthCell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const MonthCellCurrent = styled(MonthCell)`
  font-weight: bold;
`;

export const MonthCellDisabled = styled(MonthCell)`
  color: #ccc;
`;

export const MonthCellToday = styled(MonthCell)`
  background-color: #f5f5f5;
`;

export const MonthCellSelected = styled(MonthCell)`
  background-color: #ddd;
`;

export const MonthFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid #ccc;
  font-size: 1.2rem;
  color: #666;
  &:hover {
    background-color: #f5f5f5;
  }
  &:active {
    background-color: #ddd;
  }
  &:first-child {
    border-left: none;
  }
  &:last-child {
    border-right: none;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: transparent;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
  button:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  button:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  button:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }
  button:first-child:hover {
    background-color: #ddd;
  }
  button:last-child:hover {
    background-color: #ddd;
  }
  button:first-child:active {
    background-color: #ddd;
  }
  button:last-child:active {
    background-color: #ddd;
  }
  button:first-child:disabled {
    background-color: #ddd;
    color: #ccc;
    cursor: not-allowed;
  }
  button:last-child:disabled {
    background-color: #ddd;
    color: #ccc;
    cursor: not-allowed;
  }
  button:first-child:focus {
    outline: none;
  }
  button:last-child:focus {
    outline: none;
  }
`;

export const bar_css = css`
  height: 3rem;
  width: 0.7rem;
  border-radius: 1rem;
`;
export const GreenBar = styled.div`
  ${bar_css}
  background-color: #00df98;
`;

export const RedBar = styled.div`
  ${bar_css}
  background-color: #ff3939;
`;
export const YellowBar = styled.div`
  ${bar_css}
  background-color: #ffcc00;
`;

export const CircularBar = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
`;
