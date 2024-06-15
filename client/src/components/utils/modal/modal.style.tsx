import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const ModalContainer = styled.div<ThemeProps>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #322c2ccd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5001;
  padding: 0;
  position: absolute;
  top: 0;
`;

export const ModalContent = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
