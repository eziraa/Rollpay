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
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.buttons.primary};
  color: #fff;
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
    background: transparent;
    padding: 0px 2px 1px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
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