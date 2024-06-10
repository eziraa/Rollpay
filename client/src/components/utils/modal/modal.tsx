import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";
import { useAppDispatch } from "../../../utils/customHook";
import { setTask } from "../../../store/employee/employeeSlice";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatcher = useAppDispatch();
  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        dispatcher(setTask(undefined));
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            dispatcher(setTask(undefined));
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
