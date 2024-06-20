// import { CgLogIn, CgLogOut } from "react-icons/cg";
// import { logoutRequested } from "../../../store/user/userSLice";
// import { useAppDispatch } from "../../../utils/customHook";
import { Toggle } from "../../utils/buttons/toggle";
// import { Button } from "../../utils/form_elements/form.style";
import Logo from "../../utils/logo/logo";
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
} from "./header.style";
// import { useAuth } from "../../../contexts/authContext";

export const Header = () => {
  // const dispatcher = useAppDispatch();
  // const { isAuthenticated } = useAuth();
  return (
    <>
      <HeaderContainer>
        <Logo />
        <ProfileContainer>
          {/* <LoginButton
            onClick={() => {
              if (isAuthenticated) dispatcher(logoutRequested());
            }}
          >
            <>{!isAuthenticated && <p>Log In</p>}</>
          </LoginButton>*/}
          <Toggle />
           <ProfileImage />
          
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
