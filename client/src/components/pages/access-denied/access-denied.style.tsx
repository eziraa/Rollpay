import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

// Styled components
export const PageContainer = styled.div<ThemeProps>`
  font-family: "Arial", sans-serif;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
`;

export const ContentContainer = styled.div`
  text-align: center;
  padding: 20px;
  max-width: 400px;
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
`;

export const Button = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: ${({ theme }) => addOpacityToColor(0.98, theme.colors.primary)};
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
