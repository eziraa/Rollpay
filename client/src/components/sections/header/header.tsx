import { Toggle } from "../../utils/buttons/toggle";
// import { Button } from "../../utils/form_elements/form.style";
import Logo from "../../utils/logo/logo";
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
} from "./header.style";
import Profile from "../profile/profile";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { setShortTask } from "../../../store/user/user-slice";
import { SEE_PROFILE } from "../../../constants/tasks";

export const Header = () => {
  const { short_task } = useAppSelector((state) => state.user);
  const dispatcher = useAppDispatch();
  return (
    <>
      <HeaderContainer>
        <Logo />
        <ProfileContainer>
          <Toggle />
          {short_task && <Profile />}

          <ProfileImage
            onClick={() => {
              if (short_task === SEE_PROFILE)
                dispatcher(setShortTask(undefined));
              else dispatcher(setShortTask(SEE_PROFILE));
            }}
          />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
