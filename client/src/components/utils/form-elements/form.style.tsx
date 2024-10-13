import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const Input = styled.input<ThemeProps>`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.colors.primary};
  outline: none;
  &:focus {
    border: 0.1rem solid ${({ theme }) => theme.buttons.primary};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Button = styled.button<ThemeProps>`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.buttons.primary};
  color: ${({ theme }) => addOpacityToColor(0.99, theme.backgrounds.primary)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
    cursor: pointer;
  }
  border: none;
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
  position: relative;
  input {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.backgrounds.primary};
    color: ${({ theme }) => theme.colors.primary};
    outline: none;
    &:focus {
      border: 0.1rem solid ${({ theme }) => theme.buttons.primary};
    }
  }
`;
export const FormError = styled.span({
  display: "block",
  color: "red",
  fontSize: "1rem",
  maxWidth: "15rem",
});

export const Select = styled.select`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.backgrounds.primary};
  outline: none;
  color: ${({ theme }) => theme.colors.primary};
  &:focus {
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
  }
  option {
    background: transparent;
    padding: 0 0.2rem 0.1rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    height: 100%;
    line-height: 1.6;
  }
`;

export const SelectOption = styled.option<ThemeProps>`
  padding: 2rem 2rem;
  font-size: 1.6rem;
  display: inline-block;
  line-height: 2;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
`;