import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  /* border: 1px solid ${({ theme }) => theme.colors.secondary}; */
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
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
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    /* transform: scale(1.1); */
  }
  input:disabled {
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

export const Label = styled.label<ThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  outline: none;
  position: relative;
  input {
    outline: 1px solid transparent;
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;