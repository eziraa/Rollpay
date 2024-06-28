import { Toggle } from "../../utils/buttons/toggle";
// import { Button } from "../../utils/form_elements/form.style";
import Logo from "../../utils/logo/logo";
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
} from "./header.style";
import { useContext, useEffect, useState } from "react";
import { DisplayContext } from "../../../contexts/display-context";
// import axios from "axios";
import { Profile as ProfileParams } from "../../../typo/employee/response";
import Profile from "../profile/profile";
import { useProfileContext } from "../../../contexts/profile-context";
import axios from "axios";

export const Header = () => {
  const { display, setDisplay } = useContext(DisplayContext);
  const { profilePictureUrl } = useProfileContext();

  const [data, setData] = useState<ProfileParams>({ profile_picture: "" });

  const employee_id = localStorage.getItem("curr_emp_id");

  const url = `http://127.0.0.1:8000/user/profile/${employee_id}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProfileParams>(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url, employee_id]);
  return (
    <>
      <HeaderContainer>
        <Logo />
        <ProfileContainer>
          <Toggle />
          {display.see_profile && <Profile />}

          <ProfileImage
            // profile={}
            profile={
              profilePictureUrl ||
              "http://127.0.0.1:8000/" + data.profile_picture
            }
            onClick={() => {
              setDisplay({ ...display, see_profile: !display.see_profile });
            }}
          />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
