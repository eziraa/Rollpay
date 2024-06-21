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
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import {
  logoutRequested,
  setShortTask,
} from "../../../store/user/user-slice";
import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";


const Profile = () => {
  const dispatcher = useAppDispatch();

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
        dispatcher(setShortTask(undefined));
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
                dispatcher(setShortTask(undefined));
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
