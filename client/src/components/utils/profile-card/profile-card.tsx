import { useParams } from "react-router";
import api from "../../../config/api";
import {
  ActionContainer,
  CancelButton,
  CardContainer,
  CardImage,
  SaveButton,
} from "./profile-card.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setProfilePicture } from "../../../store/salary/salary-slice";

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
  const saveProfileImage = () => {
    if (employee_id) {
      const url = `http://127.0.0.1:8000/user/profile/${employee_id}`;
      const formData = new FormData();
      formData.append("profile_picture", picture);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      api
        .put(url, formData, config)
        .then((response) => {
          dispatcher(setProfilePicture(response.data.profile_picture));
          action();
        })
        .catch((error) => {
          console.log(error);
        });
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
