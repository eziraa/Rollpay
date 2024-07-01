import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";

export const ModalContainer = styled.div<ThemeProps>`
  position: fixed; /* Changed from absolute to fixed */
  width: 100vw;
  height: 100vh;
  background-color: #322c2c9b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5001;
  padding: 0;
  top: 0;
  left: 0;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%);
`;

export const ModalContent = styled.div`
  width: fit-content;
  height: fit-content;
  min-width: max-content;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  border-radius: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
