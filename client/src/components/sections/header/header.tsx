import { Toggle } from "../../utils/buttons/toggle";
// import { Button } from "../../utils/form_elements/form.style";
import Logo from "../../utils/logo/logo";
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
} from "./header.style";
import Profile from "../profile/profile";
import { useContext } from "react";
import { DisplayContext } from "../../../contexts/display-context";
// import { setShortTask } from "../../../store/user/user-slice";
// import { SEE_PROFILE } from "../../../constants/tasks";

export const Header = () => {
  // const { short_task } = useAppSelector((state) => state.user);
  const { display, setDisplay } = useContext(DisplayContext);

  return (
    <>
      <HeaderContainer>
        <Logo />
        <ProfileContainer>
          <Toggle />
          {display.see_profile && <Profile />}

          <ProfileImage
            onClick={() => {
              setDisplay({ ...display, see_profile: !display.see_profile });
            }}
          />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
