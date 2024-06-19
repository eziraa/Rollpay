import { Link } from "react-router-dom";
import {
  ResetLink,
  Label,
  Modal,
  ModalContainer,
  IconContainer,
  ItemContainer,
} from "./profile.style";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { logoutRequested } from "../../../store/user/user-slice";
import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
interface Props {
  show: boolean;
}

const Profile = ({ show }: Props) => {
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
        show = !show;
      }}
      clicked={show}
    >
      <Modal>
        {/* <Label>Username: {user.user?.username}</Label>
        <Label>Employee ID: {user.user?.employeeId}</Label> */}
        <ItemContainer>
          <IconContainer>
            <FaRegUser />
          </IconContainer>
          <Label>Profile</Label>
        </ItemContainer>
        <ItemContainer>
          <IconContainer>
            <RiLockPasswordLine />
          </IconContainer>

          <ResetLink>
            <Link to="/change-password">Change Password</Link>
          </ResetLink>
        </ItemContainer>

        <hr />
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
