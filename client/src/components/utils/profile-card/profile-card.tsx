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
  const saveProfileImage = async () => {
    if (employee_id) {
      const formData = new FormData();
      formData.append("profile_picture", picture);
      const response: string = await UserAPI.updateProfile(
        employee_id,
        formData
      );
      dispatcher(changeProfileImage(response));
      action();
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
