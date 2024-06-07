import { ModalContainer, ModalContent } from "./modal.style";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContainer>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};
