import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";
import { useContext } from "react";
import { DisplayContext } from "../../../contexts/display-context";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const { display, setDisplay } = useContext(DisplayContext);
  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        setDisplay({
          ...display,
          add_employee: false,
          add_allowance: false,
          add_overtime: false,
          add_deduction: false,
        });
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            setDisplay({
              ...display,
              add_employee: false,
              add_allowance: false,
              add_overtime: false,
              add_deduction: false,
            });
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
