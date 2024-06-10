import {
    AddUserIcon,
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
          <AddUserIcon />
          <MenuItemText>Add Employee</MenuItemText>
        </MenuItem>
      </LeftMenuContainer>
    );
  }
  
  export default LeftMenu;
  