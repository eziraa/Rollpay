import { Toggle } from "../../utils/buttons/toggle";
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
          <Toggle />
          {/* <Link to="/edit-profile"> */}
            <ProfileImage />
          {/* </Link> */}
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
