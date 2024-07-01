import { useNavigate } from "react-router";
import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";

export const Modal = ({
  children,
  closeAction,
}: {
  children: React.ReactNode;
  closeAction: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        closeAction();
        navigate(-1);
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            navigate(-1);
            closeAction();
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
