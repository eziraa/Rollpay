import styled from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  top: 0;
  padding: 0;
`;

export const ModalContent = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  border-radius: 1rem;
  position: relative;
  padding: 0;
`;
