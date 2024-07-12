import { useParams } from "react-router";
import {
  ActionContainer,
  CancelButton,
  CardContainer,
  CardImage,
  SaveButton,
} from "./profile-card.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import UserAPI from "../../../services/user-api";
import { changeProfileImage } from "../../../store/user/user-slice";
import { useUser } from "../../../hooks/user-hook";

export const ImageCard = ({
  picture,
  action,
}: {
  picture: File;
  action: () => void;
}) => {
  // Getting necessary data
  const dispatcher = useAppDispatch();
  const { employee_id } = useParams();
  const { user } = useUser();
  const saveProfileImage = async () => {
    if (employee_id) {
      const formData = new FormData();
      formData.append("profile_picture", picture);
      console.log("*********************");
      console.log(user);
      if (user) {
        const response: string = await UserAPI.updateProfile(
          user?.user_id,
          formData
        );
        dispatcher(changeProfileImage(response));
        action();
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
            action();
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
