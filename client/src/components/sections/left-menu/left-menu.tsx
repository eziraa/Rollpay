import { useAppSelector } from "../../../utils/custom-hook";
import {
  SalaryIcon,
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  UsersIcon,
} from "./left-menu.style";
import { useNavigate } from "react-router";
import { LIST_EMP_S, SEE_EMP_SALARY } from "../../../constants/tasks";

function LeftMenu({ current_menu }: { current_menu: string }) {
  const { loading } = useAppSelector((state) => state.employee);
  const navigate = useNavigate();
  return (
    <LeftMenuContainer>
      <MenuItem active={false}>
        <HomeIcon />
        <MenuItemText>Home</MenuItemText>
      </MenuItem>
      <MenuItem
        active={current_menu === LIST_EMP_S}
        onClick={(e) => {
          if (loading) return;
          e.preventDefault();
          e.stopPropagation();
          navigate("/employees");
        }}
      >
        <UsersIcon />
        <MenuItemText>All Employees</MenuItemText>
      </MenuItem>
      <MenuItem
        active={current_menu === SEE_EMP_SALARY}
        onClick={() => {
          if (loading) return;

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
