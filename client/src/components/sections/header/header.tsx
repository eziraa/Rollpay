/* eslint-disable react-hooks/exhaustive-deps */
import { Toggle } from "../../utils/buttons/toggle";
// import { Button } from "../../utils/form_elements/form.style";
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
  WelcomeMessageContainer,
} from "./header.style";
import { useEffect, useState } from "react";

import Profile from "../profile/profile";

import { CURRENT_USER } from "../../../constants/token-constants";
import { useAppDispatch } from "../../../utils/custom-hook";
import { baseURL } from "../../../config/api";
import { getCurrentUserRequest } from "../../../store/user/user-slice";
import { useUser } from "../../../hooks/user-hook";
import { BlurredText, MidBlurredText } from "../../utils/titles/titles";
import { stringDay } from "../../utils/day/string-day";

export const Header = () => {
  const curr_user = localStorage.getItem(CURRENT_USER);
  const employee_id = JSON.parse(curr_user || "[]")?.id;
  const { user } = useUser();
  const dispatcher = useAppDispatch();
  const [openProfileMenu, setProfileMenu] = useState<boolean>();

  useEffect(() => {
    employee_id && dispatcher(getCurrentUserRequest(employee_id));
  }, []);

  const closeAction = () => {
    setProfileMenu(false);
  };
  return (
    <>
      <HeaderContainer>
        <WelcomeMessageContainer>
          <BlurredText>Welcome, Mr. {user?.employee.first_name}</BlurredText>
          <MidBlurredText>
            Today is {stringDay(new Date(Date.now()))}
          </MidBlurredText>
        </WelcomeMessageContainer>
        <ProfileContainer>
          <Toggle />
          {openProfileMenu && <Profile close={closeAction} />}
          <ProfileImage
            profile={baseURL + user?.employee.profile_picture}
            onClick={() => {
              setProfileMenu(!openProfileMenu);
            }}
          />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
