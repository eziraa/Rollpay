import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgrounds.color};
`;

export const DashboardBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  width: 100%;
  padding: 2rem;
  flex: 1;
`;
