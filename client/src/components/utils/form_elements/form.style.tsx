import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:disabled {
    background-color: ${({ theme }) => theme.backgrounds.disabled};
    cursor: not-allowed;
  }
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.secondary};
`;
