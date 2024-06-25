import { useModal } from "../../../hooks/modal-hook";
import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";

export const Modal = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  const { closeModal } = useModal();
  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        closeModal(content);
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            closeModal(content);
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
