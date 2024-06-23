import { CLOSE_MODAL } from "../../../constants/tasks";
import { useModal } from "../../../hooks/modal-hook";
import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const { openModal } = useModal();
  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        openModal(CLOSE_MODAL);
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            openModal(CLOSE_MODAL);
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
