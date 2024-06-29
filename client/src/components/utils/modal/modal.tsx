import { useNavigate } from "react-router";
import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";

export const Modal = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  const navigate = useNavigate();
  console.log(content);
  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        navigate(-1);
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
