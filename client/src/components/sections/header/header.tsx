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
import { HamburgerMenu } from "../../pages/home/home-page.style";
import { HiMenu } from "react-icons/hi";
import { useRefs } from "../../../hooks/refs-hook";

export const Header = () => {
  const curr_user = localStorage.getItem(CURRENT_USER);
  const employee_id = JSON.parse(curr_user || "[]")?.id;
  const { user } = useUser();
  const dispatcher = useAppDispatch();
  const leftMenuRef = useRefs().refs?.leftMenuRef;
  useEffect(() => {
    employee_id && dispatcher(getCurrentUserRequest(employee_id));
  }, []);

  return (
    <>
      <HeaderContainer>
        <HamburgerMenu
          className="hamburger-menu"
          onClick={() => {
            leftMenuRef &&
              leftMenuRef.current &&
              leftMenuRef.current.classList.toggle("collapsed");
          }}
        >
          <HiMenu />
        </HamburgerMenu>
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
