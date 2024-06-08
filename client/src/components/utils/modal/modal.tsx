import { useState } from "react";
import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openModal, closeModal] = useState(true);
  if (!openModal) return;
  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        closeModal(false);
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            closeModal(false);
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
