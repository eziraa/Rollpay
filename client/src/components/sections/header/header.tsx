/* eslint-disable react-hooks/exhaustive-deps */
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
  WelcomeMessageContainer,
} from "./header.style";
import { useEffect } from "react";

import { CURRENT_USER } from "../../../constants/token-constants";
import { useAppDispatch } from "../../../utils/custom-hook";
import { baseURL } from "../../../config/api";
import { getCurrentUserRequest } from "../../../store/user/user-slice";
import { useUser } from "../../../hooks/user-hook";
import { BlurredText, MidBlurredText } from "../../utils/titles/titles";
import { stringDay } from "../../utils/day/string-day";
import { Notification } from "./notification";
import { DropDown } from "./profile-drop-down";

export const Header = () => {
  const curr_user = localStorage.getItem(CURRENT_USER);
  const employee_id = JSON.parse(curr_user || "[]")?.id;
  const { user } = useUser();
  const dispatcher = useAppDispatch();

  useEffect(() => {
    employee_id && dispatcher(getCurrentUserRequest(employee_id));
  }, []);


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
          <Notification />
          <ProfileImage profile={baseURL + user?.employee.profile_picture} />
          <DropDown />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
