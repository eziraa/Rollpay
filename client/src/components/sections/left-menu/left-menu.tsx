import {
  SalaryIcon,
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  UsersIcon,
} from "./left-menu.style";

function LeftMenu() {
  return (
    <LeftMenuContainer>
      <MenuItem>
        <HomeIcon />
        <MenuItemText>Home</MenuItemText>
      </MenuItem>
      <MenuItem>
        <UsersIcon />
        <MenuItemText>All Employees</MenuItemText>
      </MenuItem>
      <MenuItem>
        <SalaryIcon />
        <MenuItemText>Salary</MenuItemText>
      </MenuItem>
    </LeftMenuContainer>
  );
}

export default LeftMenu;
