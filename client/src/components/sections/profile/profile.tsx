import { Link } from "react-router-dom";
import {
  LogoutButton,
  ResetLink,
  Label,
  Modal,
  ModalContainer,
} from "./profile.style";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { logoutRequested } from "../../../store/user/user-slice";

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
    <ModalContainer clicked={show}>
      <Modal>
        <Label>Username: {user.user?.username}</Label>
        <Label>Employee ID: {user.user?.employeeId}</Label>
        <ResetLink>
          <Link to="/change-password">Change Password</Link>
        </ResetLink>
        <hr />
        <LogoutButton onClick={handleClick}>Log out</LogoutButton>
      </Modal>
    </ModalContainer>
  );
};

export default Profile;
