import Logo from "../../utils/logo/logo";
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
} from "./header.style";

export const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Logo />
        <ProfileContainer>
          <ProfileImage />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
