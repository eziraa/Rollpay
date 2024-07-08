import styled, { css } from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const CheckFlashMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 2rem;
  width: 25vw;
  height: 25vh;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 1rem;
  border: 0.1rem solid #089c75;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;

export const CheckFlashMessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  padding: 0.5rem 1rem;
  width: 100%;
  flex: 1;
  border-bottom: 0.1rem solid #089c75;
`;

export const CheckFlashMessageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  flex: 1;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => addOpacityToColor(0.65, theme.colors.primary)};
`;

export const CheckFlashMessageText = styled.p`
  padding: 0 1rem;
  font-size: 1.3rem;
  width: 100%;
  font-weight: bold;
  flex: 1;
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
`;
export const BtnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  gap: 1rem;
  width: 100%;
  flex: 3;
`;

export const btn_css = css`
  background-color: #22c79b;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
`;

export const DoneButton = styled.button`
  ${btn_css};
`;
export const CancelButton = styled.button`
  ${btn_css};
  background-color: #d5bc69;
  color: #089c75;
`;

export const CloseButton = styled.button`
  ${btn_css};
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: 0.3rem;
  font-size: 2rem;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
