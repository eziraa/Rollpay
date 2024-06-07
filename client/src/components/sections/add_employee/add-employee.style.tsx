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
  column-gap: 2rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GenderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  row-gap: 1rem;
`;

