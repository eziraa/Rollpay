import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <CloseIcon />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
