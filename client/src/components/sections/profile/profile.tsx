import { Link, useNavigate } from "react-router-dom";
import {
  ResetLink,
  Label,
  Modal,
  ModalContainer,
  IconContainer,
  ItemContainer,
} from "./profile.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { logoutRequested } from "../../../store/user/user-slice";
import { MdLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../../hooks/auth-hook";
const Profile = ({ close }: { close: () => void }) => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { curr_user: user } = useAuth();
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
      className=" bg fixed inset-0 flex justify-center items-center "
      style={{
        zIndex: 1000,
      }}
    >
      <Modal
        style={{
          zIndex: 5000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
              <div
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/${user?.role !== "user" ? "me" : ""}`)
                }
              >
                Profile
              </div>
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

        <ItemContainer>
          <IconContainer>
            <MdLogout />
          </IconContainer>
          <Label
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            style={{
              justifyContent: "start",
            }}
          >
            <p> Log out</p>
          </Label>
        </ItemContainer>
      </Modal>
    </ModalContainer>
  );
};

export default Profile;
