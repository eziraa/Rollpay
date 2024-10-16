import { useParams } from "react-router";
import {
  ActionContainer,
  CancelButton,
  CardContainer,
  CardImage,
  SaveButton,
} from "./profile-card.style";
import UserAPI from "../../../services/user-api";
import { useAuth } from "../../../hooks/auth-hook";

export const ImageCard = ({
  picture,
  handleClose,
}: {
  picture: File;
  handleClose: () => void;
}) => {
  // Getting necessary data
  const { employee_id } = useParams();
  const { curr_user: user, setCurrUser } = useAuth();
  const saveProfileImage = async () => {
    if (employee_id) {
      const formData = new FormData();
      formData.append("profile_picture", picture);

      if (user) {
        await UserAPI.updateProfile(user?.user_id, formData).then((res) => {
          setCurrUser({
            ...user,
            profile_picture: res,
          });
          handleClose();
        });
      }
    }
  };

  return (
    <CardContainer>
      <CardImage src={URL.createObjectURL(picture)} />
      <ActionContainer>
        <CancelButton
          onClick={(e) => {
            e.preventDefault();
            handleClose();
          }}
        >
          Cancel
        </CancelButton>
        <SaveButton
          onClick={(e) => {
            e.preventDefault();
            saveProfileImage();
          }}
        >
          Save
        </SaveButton>
      </ActionContainer>
    </CardContainer>
  );
};
