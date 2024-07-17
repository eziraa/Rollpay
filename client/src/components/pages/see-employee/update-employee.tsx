import { ActionBtnsContainer, Button } from "./see-employee.style";
import { DeleteButton } from "../../utils/profile/employee-profile.style";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  deleteEmpRequested,
  tryingToDelete,
} from "../../../store/employee/employee-slice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const dispatcher = useAppDispatch();
  const navigator = useNavigate();
  const { employee_id } = useParams();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ActionBtnsContainer
        style={{
          gap: "2rem",
        }}
      >
        <DeleteButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatcher(tryingToDelete());
            if (employee_id) dispatcher(deleteEmpRequested(employee_id));
            navigator(-1)
          }}
        >
          <RiDeleteBin6Line /> Delete
        </DeleteButton>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator("edit");
          }}
        >
          <MdModeEditOutline /> Edit
        </Button>
      </ActionBtnsContainer>
    </div>
  );
};

export default UpdateEmployee;
