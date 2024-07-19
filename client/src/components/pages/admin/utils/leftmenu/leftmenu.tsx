import { useLocation, useNavigate } from "react-router";
import {
  MenuItem,
  MenuItemText,
} from "../../../../sections/left-menu/left-menu.style";
import { LeftMenuContainer } from "./leftmenu.style";

const menu_items = [
  {
    title: "Users",
    path: "/users",
  },
  {
    title: "Groups",
    path: "/groups",
  },

  {
    title: "Roles",
    path: "/roles",
  },
  {
    title: "Employees",
    path: "/employees",
  },
];

export const LeftMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <LeftMenuContainer>
      {menu_items.map((menuItem) => (
        <MenuItem
          active={pathname.startsWith(menuItem.path)}
          onClick={() => navigate(menuItem.path)}
        >
          <MenuItemText>{menuItem.title}</MenuItemText>
        </MenuItem>
      ))}
    </LeftMenuContainer>
  );
};
