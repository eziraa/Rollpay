import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const ModalContainer = styled.div<ThemeProps>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5001;
  top: -7rem;
  padding: 0;
  margin-top: 7rem;
`;

export const ModalContent = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  border-radius: 1rem;
  position: relative;
  margin-top: -10rem;
`;
