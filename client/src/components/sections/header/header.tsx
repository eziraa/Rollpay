import { useState } from "react";
import { Toggle } from "../../utils/buttons/toggle";
import Logo from "../../utils/logo/logo";
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
} from "./header.style";
import Profile from "../profile/profile";

export const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <>
      <HeaderContainer>
        <Logo />
        <ProfileContainer>
          <Toggle />
          <ProfileImage
            onClick={() => {
              setShowProfile(!showProfile);
            }}
          />
        </ProfileContainer>
        <Profile show={showProfile} />
      </HeaderContainer>
    </>
  );
};
