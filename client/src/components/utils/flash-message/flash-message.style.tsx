import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const FlasheMessageContainr = styled.div`
  background-color: ${() => addOpacityToColor(0.7, "#300D59")};
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  color: ${({ theme }) => theme.backgrounds.primary};
  position: absolute;
  bottom: 5rem;
  right: 10rem;
  padding: 1rem;
  z-index: 10000;
`;

export const FlashMessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: start;
`;

export const FlashMessageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
`;
export const FlashMessageContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

export const FlashMessageText = styled.p`
  font-size: 1.6rem;
  text-align: left;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  color: "#ff0000";
`;

export const FlashMessageIcon = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: "#ff0000";
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;
