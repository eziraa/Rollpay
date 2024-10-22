import { useNavigate } from "react-router";
import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";
import useOutsideClick from "../../../hooks/useOutsideClick";

export const Modal = ({
  children,
  closeAction,
}: {
  children: React.ReactNode;
  closeAction: () => void;
}) => {
  const navigate = useNavigate();

  const close = () => {
    navigate(-1);
    closeAction();
  };
  const { ref } = useOutsideClick({ close });
  return (
    <ModalContainer className="drop-shadow-2xl backdrop-blur-sm">
      <ModalContent ref={ref}>
        <CloseIcon
          onClick={() => {
            close();
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
