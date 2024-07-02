import {
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  LogoContainer,
  LogoImage,
  UserIcon,
} from "../left-menu/left-menu.style";
import { useLocation, useNavigate } from "react-router";
import Image from "../../../assets/logo.jpg";
import { Title } from "../add_employee/add-employee.style";
import { useUser } from "../../../hooks/user-hook";

function UserMenu() {
  const { task_finished, user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <LeftMenuContainer>
      <LogoContainer>
        <LogoImage src={Image} />
        <Title>
          Ethio
          <span
            style={{
              color: "red",
            }}
          >
            Den
          </span>
        </Title>
      </LogoContainer>
      <MenuItem
        active={pathname === "/"}
        onClick={(e) => {
          if (!task_finished) return;
          e.preventDefault();
          e.stopPropagation();
          navigate("/");
        }}
      >
        <HomeIcon />
        <MenuItemText>Home</MenuItemText>
      </MenuItem>
      <MenuItem
        active={pathname.endsWith("/employees")}
        onClick={(e) => {
          if (!task_finished) return;
          e.preventDefault();
          e.stopPropagation();
          navigate("/user-profile/" + user?.employee.id);
        }}
      >
        <UserIcon />
        <MenuItemText>My Profile</MenuItemText>
      </MenuItem>
    </LeftMenuContainer>
  );
}

export default UserMenu;
