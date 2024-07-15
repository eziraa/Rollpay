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
import { logoutRequested } from "../../../store/user/user-slice";
import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
const Profile = ({ close }: { close: () => void }) => {
  // Calling hooks anf getting necessary information
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.is_login) {
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []);

  const handleClick = () => {
    dispatcher(logoutRequested());
  };

  return (
    <ModalContainer
      onClick={() => {
        close();
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
                close();
              }}
            >
              <Link to={`/user-profile/${user.user?.user_id}`}>Profile</Link>
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
