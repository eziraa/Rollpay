import styled from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { custom_scroll_bar } from "../../utils/scroll-bar/scroll-bar";

export const AllowanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0rem 0rem 1rem ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  height: 100%;
  width: 100%;
  gap: 2rem;
`;

export const AllowanceHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
`;

export const AllowanceTitle = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  letter-spacing: 0.1rem;
`;

export const AddButton = styled.button`
  font-size: 2rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const AllowanceBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
  flex-direction: column;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  ${custom_scroll_bar};
`;
