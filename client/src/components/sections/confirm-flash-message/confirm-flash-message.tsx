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
  closeEmployeeTask,
} from "../../../store/employee/employee-slice";
import { useNavigate, useParams } from "react-router";

export const CheckFlashMessage = () => {
  const { task_finished } = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { employee_id } = useParams();
  const navigate = useNavigate();
  if (task_finished) {
    navigate("/employees");
  }
  return (
    <ModalContainer
      style={{
        backgroundColor: "#A9A5A598",
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatcher(closeEmployeeTask());
        navigate(-1);
      }}
    >
      <CheckFlashMessageContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            dispatcher(closeEmployeeTask());
            navigate(-1);
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
              navigate(-1);
              dispatcher(closeEmployeeTask());
            }}
          >
            Cancel
          </CancelBtn>
          <DoneButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              employee_id && dispatcher(deleteEmpRequested(employee_id));
            }}
          >
            Done
          </DoneButton>
        </BtnsContainer>
      </CheckFlashMessageContainer>
    </ModalContainer>
  );
};
