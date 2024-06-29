import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const ModalContainer = styled.div<ThemeProps>`
  position: fixed; /* Changed from absolute to fixed */
  width: 100vw;
  height: 100vh;
  background-color: #322c2ccd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5001;
  padding: 0;
  top: 0;
  left: 0;
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
