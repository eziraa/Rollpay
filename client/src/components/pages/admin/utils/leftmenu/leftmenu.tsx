import { MenuItem } from "../../../../sections/left-menu/left-menu.style";
import { LeftMenuContainer } from "./leftmenu.style";

export const LeftMenu = () => {
  return (
    <LeftMenuContainer>
      <MenuItem active={true}>DashBoard</MenuItem>
      <MenuItem active={false}>Groups</MenuItem>
      <MenuItem active={false}>Users</MenuItem>
      <MenuItem active={false}>Roles</MenuItem>
      <MenuItem active={false}>Employees</MenuItem>
    </LeftMenuContainer>
  );
};
