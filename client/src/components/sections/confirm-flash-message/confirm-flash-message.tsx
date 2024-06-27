import { MdClose } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { ModalContainer } from "../../utils/modal/modal.style";
import { CancelBtn } from "../../pages/edit-employee/edit-employee.style";
import {
  BtnsContainer,
  CheckFlashMessageContainer,
  CheckFlashMessageHeader,
  CheckFlashMessageText,
  CheckFlashMessageTitle,
  CloseButton,
  DoneButton,
} from "./confirm-flash-message.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import {
  deleteEmpRequested,
  unfinishedDelete,
} from "../../../store/employee/employee-slice";

export const CheckFlashMessage = () => {
  const { deleting, curr_emp: current_employee } = useAppSelector(
    (state) => state.employee
  );
  const dispatcher = useAppDispatch();
  if (!deleting) return null;
  return (
    <ModalContainer
      style={{
        backgroundColor: "#A9A5A598",
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatcher(unfinishedDelete());
      }}
    >
      <CheckFlashMessageContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            dispatcher(unfinishedDelete());
          }}
        >
          <MdClose />
        </CloseButton>
        <CheckFlashMessageHeader>
          <TiWarning color="#dc3545" size={30} />
          <CheckFlashMessageTitle>Deleting Item</CheckFlashMessageTitle>
        </CheckFlashMessageHeader>
        <CheckFlashMessageText>
          Please make sure you want to delete this item
        </CheckFlashMessageText>
        <BtnsContainer>
          <CancelBtn
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatcher(unfinishedDelete());
            }}
          >
            Cancel
          </CancelBtn>
          <DoneButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatcher(deleteEmpRequested(current_employee?.id || ""));
            }}
          >
            Done
          </DoneButton>
        </BtnsContainer>
      </CheckFlashMessageContainer>
    </ModalContainer>
  );
};
