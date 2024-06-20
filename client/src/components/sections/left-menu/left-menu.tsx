import { LIST_EMP_S, SEE_EMP_SALARY } from "../../../constants/tasks";
import { setLongTask } from "../../../store/user/user-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
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
  const { loading } = useAppSelector((state) => state.employee);
  const { long_task } = useAppSelector((state) => state.user);

  return (
    <LeftMenuContainer>
      <MenuItem active={long_task === undefined}>
        <HomeIcon />
        <MenuItemText>Home</MenuItemText>
      </MenuItem>
      <MenuItem
        active={long_task === LIST_EMP_S}
        onClick={(e) => {
          if (loading) return;
          e.preventDefault();
          e.stopPropagation();
          dispatcher(setLongTask(LIST_EMP_S));
        }}
      >
        <UsersIcon />
        <MenuItemText>All Employees</MenuItemText>
      </MenuItem>
      <MenuItem
        active={long_task === SEE_EMP_SALARY}
        onClick={(e) => {
          if (loading) return;
          e.preventDefault();
          e.stopPropagation();
          dispatcher(setLongTask(SEE_EMP_SALARY));
        }}
      >
        <SalaryIcon />
        <MenuItemText>Employees Salary</MenuItemText>
      </MenuItem>
    </LeftMenuContainer>
  );
}

export default LeftMenu;
