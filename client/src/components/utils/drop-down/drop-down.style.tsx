import styled from "styled-components";

export const DropDownContainer = styled.select`
  background-color: ${({ theme }) => theme.textPrimary};
  color: ${({ theme }) => theme.backgroundPrimary};
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 1.3frem;

  &:focus {
    outline: none;
  }
`;

export const DropDownItem = styled.option`
  color: ${({ theme }) => theme.backgroundPrimary};
  text-align: center;
  border: 2px solid ${({ theme }) => theme.backgroundPrimary};
`;
