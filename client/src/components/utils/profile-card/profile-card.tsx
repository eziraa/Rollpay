import { useParams } from "react-router";
import api from "../../../config/api";
import {
  ActionContainer,
  CancelButton,
  CardContainer,
  CardImage,
  SaveButton,
} from "./profile-card.style";

export const ImageCard = ({
  picture,
  action,
}: {
  picture: File;
  action: () => void;
}) => {
  // Getting necessary data

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
          console.log(response);
          // setProfilePictureUrl(
          //   `http://127.0.0.1:8000/${response.data.profile_picture}`
          // );
          // setData({ ...data, profile_picture: response.data.profile_picture });
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
        <SaveButton onClick={saveProfileImage}>Save</SaveButton>
      </ActionContainer>
    </CardContainer>
  );
};
