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
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { logoutRequested } from "../../../store/user/user-slice";
import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
const Profile = ({ close }: { close: () => void }) => {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleClick = () => {
    dispatcher(logoutRequested());
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <ModalContainer
      onClick={(e) => {
        e.stopPropagation();
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
              <Link to={`/user-profile/${user.user?.employeeId}`}>Profile</Link>
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
          <Label
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Log out
          </Label>
        </ItemContainer>
      </Modal>
    </ModalContainer>
  );
};

export default Profile;
