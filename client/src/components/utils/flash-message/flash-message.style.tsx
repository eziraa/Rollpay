import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { RiCloseFill } from "react-icons/ri";

export const FlasheMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  position: absolute;
  top: 1.5rem;
  right: 10rem;
  z-index: 10000;
  gap: 0.5rem;
`;
export const FlashMessageItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 0.5rem 1rem;
  border-width: 0.1rem;
  border-style: solid;
  border-radius: 0.5rem;
  gap: 1rem;
`;

export const FlashMessageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0;
  flex: 5;
`;

export const FlashMessageTitle = styled.h2`
  font-size: 1.1rem;
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
  font-weight: 600;
  letter-spacing: 0.15rem;
  text-align: left;
`;

export const FlashMessageText = styled.p`
  font-size: 1rem;
  text-align: left;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
`;

export const FlashMessageIcon = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
`;

export const CloseIcon = styled(RiCloseFill)`
  color: ${({ theme }) => addOpacityToColor(0.6, theme.backgrounds.primary)};
  border: none;
  font-size: 3.4rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.backgrounds.primary};
  }
  justify-self: end;
  flex: 0.7;
`;