import { css } from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const add_container = css`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  border-radius: 1rem;
  height: auto;
  width: 100%;
  margin: 0;
  gap: 3rem;
`;

export const add_body = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  position: relative;
  padding: 1rem;
  gap: 1rem;
`;

export const add_btn = css`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.3rem;
  text-align: center;
  border: none;
  background-color: ${({ theme }) => theme.buttons.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
    cursor: pointer;
  }
`;
