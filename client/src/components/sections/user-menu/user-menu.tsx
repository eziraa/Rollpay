import {
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  LogoContainer,
  LogoImage,
  UserIcon,
  UsersIcon,
} from "../left-menu/left-menu.style";
import { useLocation, useNavigate } from "react-router";
import Image from "../../../assets/logo.png";
import { Title } from "../add_employee/add-employee.style";
import { useAuth } from "../../../hooks/auth-hook";

function UserMenu() {
    const { curr_user: user } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <LeftMenuContainer>
      <LogoContainer>
        <LogoImage src={Image} />
        <Title>
          Pay
          <span
            style={{
              color: "#1e8054",
            }}
          >
            roll
          </span>
        </Title>
      </LogoContainer>
      <MenuItem
        is_active={pathname === "/"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate("/");
        }}
      >
        {user?.role === "user" ? <HomeIcon /> : <UsersIcon />}
        <MenuItemText>Dashboard</MenuItemText>
      </MenuItem>
      {user?.role === "Clerk" && (
        <MenuItem
          is_active={pathname === "/me"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/me");
          }}
        >
          <HomeIcon />
          <MenuItemText> Home</MenuItemText>
        </MenuItem>
      )}
      <MenuItem
        is_active={pathname.includes("user-profile")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate("user-profile/" + user?.employee.id);
        }}
      >
        <UserIcon />
        <MenuItemText>My Profile</MenuItemText>
      </MenuItem>
    </LeftMenuContainer>
  );
}

export default UserMenu;
