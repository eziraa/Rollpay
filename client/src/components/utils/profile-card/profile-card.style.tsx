import styled, { css } from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  width: 20rem;
  height: 25rem;
  position: absolute;
  top: -1rem;
  left: -50%;
  box-shadow: 0 0 0.5rem #7d7c7c7d;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  padding: 1rem;
`;

interface ImageProps {
  src: string;
}
export const CardImage = styled.img<ImageProps>`
  width: 100%;
  flex: 4;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: 0.3rem 0.3rem 0 0;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
`;

const btn_css = css`
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
  background-color: ${({ theme }) => theme.buttons.primary};
`;

export const CancelButton = styled.button`
  ${btn_css};
  background-color: #c1bba450;
`;

export const SaveButton = styled.button`
  ${btn_css};
  color: #ffffff;
`;

export const TextInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
`;
