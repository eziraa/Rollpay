import { Link } from "react-router-dom";
import {
  ResetLink,
  Label,
  Modal,
  ModalContainer,
  IconContainer,
  ItemContainer,
  HorizontalLine,
} from "./profile.style";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { logoutRequested } from "../../../store/user/user-slice";
import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { DisplayContext } from "../../../contexts/display-context";

const Profile = () => {
  const dispatcher = useAppDispatch();
  const { display, setDisplay } = useContext(DisplayContext);
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user.is_login) window.location.href = "/";
  }, [user]);

  const handleClick = () => {
    dispatcher(logoutRequested());
  };

  return (
    <ModalContainer
      onClick={() => {
        setDisplay({ ...display, see_profile: false });
      }}
    >
      <Modal onClick={(e) => e.stopPropagation()}>
        <ItemContainer>
          <IconContainer>
            <FaRegUser />
          </IconContainer>
          <ResetLink>
            <Label
              onClick={(e) => {
                e.stopPropagation();
                setDisplay({ ...display, see_profile: false });
              }}
            >
              <Link to="/user-profile">Profile</Link>
            </Label>
          </ResetLink>
        </ItemContainer>
        <ItemContainer>
          <IconContainer>
            <RiLockPasswordLine />
          </IconContainer>

          <ResetLink>
            <Link to="/change-password">Change Password</Link>
          </ResetLink>
        </ItemContainer>

        <HorizontalLine />
        <ItemContainer>
          <IconContainer>
            <MdLogout />
          </IconContainer>
          <Label onClick={handleClick}>Log out</Label>
        </ItemContainer>
      </Modal>
    </ModalContainer>
  );
};

export default Profile;
