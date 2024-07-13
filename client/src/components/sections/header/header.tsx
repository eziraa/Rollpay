/* eslint-disable react-hooks/exhaustive-deps */
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
  WelcomeMessageContainer,
} from "./header.style";
import { useUser } from "../../../hooks/user-hook";
import { BlurredText, MidBlurredText } from "../../utils/titles/titles";
import { stringDay } from "../../utils/day/string-day";
import { DropDown } from "./profile-drop-down";
import { HamburgerMenu } from "../../pages/home/home-page.style";
import { HiMenu } from "react-icons/hi";
import { useRefs } from "../../../hooks/refs-hook";
import { baseURL } from "../../../config/api";

export const Header = () => {
  const { user } = useUser();
  const leftMenuRef = useRefs().refs?.leftMenuRef;

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
          <ProfileImage profile={baseURL + user?.profile_picture} />
          <DropDown />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
