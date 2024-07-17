import { ActionBtnsContainer, Button } from "./see-employee.style";
import { DeleteButton } from "../../utils/profile/employee-profile.style";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { useAppDispatch } from "../../../utils/custom-hook";
import { tryingToDelete } from "../../../store/employee/employee-slice";
import { useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  const dispatcher = useAppDispatch();
  const navigator = useNavigate();

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
            navigator("delete");
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
