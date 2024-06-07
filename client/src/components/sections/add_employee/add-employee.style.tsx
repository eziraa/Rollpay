import styled from "styled-components";

export const AddEmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-shadow: 0 0 3rem ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
  height: auto;
  width: 100%;
  margin: 0;
`;

export const AddEmployeeForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
