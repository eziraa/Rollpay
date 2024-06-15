import { CloseIcon } from "../buttons/close";
import { ModalContainer, ModalContent } from "./modal.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setTask } from "../../../store/employee/employee-slice";
import { setShortTask } from "../../../store/user/user-slice";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatcher = useAppDispatch();
  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
        dispatcher(setTask(undefined));
        dispatcher(setShortTask(undefined));
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon
          onClick={() => {
            dispatcher(setTask(undefined));
            dispatcher(setShortTask(undefined));
          }}
        />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
