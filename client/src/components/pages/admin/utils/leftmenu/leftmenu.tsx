import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "../../../../sections/left-menu/left-menu.style";
import { LeftMenuContainer } from "./leftmenu.style";

const menu_items = [
  {
    title: "Dashboard",
    path: "",
  },
  {
    title: "Groups",
    path: "/groups",
  },
  {
    title: "Users",
    path: "/users",
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
          active={menuItem.path === pathname}
          onClick={() => navigate(menuItem.path)}
        >
          {menuItem.title}
        </MenuItem>
      ))}
    </LeftMenuContainer>
  );
};
