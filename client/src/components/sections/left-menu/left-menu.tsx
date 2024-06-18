import { LIST_EMP_S, SEE_EMP_SALARY } from "../../../constants/tasks";
import { setLongTask } from "../../../store/user/user-slice";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  SalaryIcon,
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  UsersIcon,
} from "./left-menu.style";

function LeftMenu() {
  const dispatcher = useAppDispatch();
  return (
    <LeftMenuContainer>
      <MenuItem>
        <HomeIcon />
        <MenuItemText>Home</MenuItemText>
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatcher(setLongTask(LIST_EMP_S));
        }}
      >
        <UsersIcon />
        <MenuItemText>All Employees</MenuItemText>
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatcher(setLongTask(SEE_EMP_SALARY));
        }}
      >
        <SalaryIcon />
        <MenuItemText>Salary</MenuItemText>
      </MenuItem>
    </LeftMenuContainer>
  );
}

export default LeftMenu;
