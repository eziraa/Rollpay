import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgrounds.color};
`;

export const DashboardBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  width: 100%;
  padding: 2rem;
`;
