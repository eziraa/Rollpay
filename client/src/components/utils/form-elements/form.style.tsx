import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../convertor/add-opacity-color";

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
  background-color: ${({ theme }) => theme.backgrounds.primary};
  outline: none;
  color: ${({ theme }) => theme.colors.primary};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Button = styled.button<ThemeProps>`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  /* border: 1px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  outline: none; */
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
    cursor: pointer;
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
    background-color: ${({ theme }) => theme.backgrounds.primary};
    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const FormError = styled.span({
  display: "block",
  color: "red",
  fontSize: "1rem",
});


export const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.backgrounds.primary};
  outline: none;
  color: ${({ theme }) => theme.colors.primary};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  option {
    color: black;
    background: white;
    padding: 0px 2px 1px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    height: 100%;
    padding: 2rem 2rem;
  }
`;

export const SelectOption = styled.option<ThemeProps>`
  font-size: 1.4rem;
  display: inline-block;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
`;