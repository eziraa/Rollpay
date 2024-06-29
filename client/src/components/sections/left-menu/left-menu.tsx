import { useAppSelector } from "../../../utils/custom-hook";
import {
  SalaryIcon,
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  UsersIcon,
} from "./left-menu.style";
import { useLocation, useNavigate } from "react-router";

function LeftMenu() {
  const { task_finished } = useAppSelector((state) => state.employee);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <LeftMenuContainer>
      <MenuItem active={false}>
        <HomeIcon />
        <MenuItemText>Home</MenuItemText>
      </MenuItem>
      <MenuItem
        active={pathname.endsWith("/employees")}
        onClick={(e) => {
          if (!task_finished) return;
          e.preventDefault();
          e.stopPropagation();
          navigate("/employees");
        }}
      >
        <UsersIcon />
        <MenuItemText>All Employees</MenuItemText>
      </MenuItem>
      <MenuItem
        active={pathname.endsWith("/employees-salary")}
        onClick={() => {
          if (!task_finished) return;

          navigate("/employees-salary");
        }}
      >
        <SalaryIcon />
        <MenuItemText>Employees Salary</MenuItemText>
      </MenuItem>
    </LeftMenuContainer>
  );
}

export default LeftMenu;
