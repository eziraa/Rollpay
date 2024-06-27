import { useContext } from "react";
import { useAppSelector } from "../../../utils/custom-hook";
import {
  SalaryIcon,
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  UsersIcon,
} from "./left-menu.style";
import { DisplayContext } from "../../../contexts/display-context";
import { useNavigate } from "react-router";

function LeftMenu() {
  const { loading } = useAppSelector((state) => state.employee);
  // const { long_task } = useAppSelector((state) => state.user);
  const { display } = useContext(DisplayContext);
  const navigate = useNavigate();
  return (
    <LeftMenuContainer>
      <MenuItem
        active={Boolean(
          !display.list_employees && !display.see_employee_salary
        )}
      >
        <HomeIcon />
        <MenuItemText>Home</MenuItemText>
      </MenuItem>
      <MenuItem
        active={display.list_employees}
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
        active={display.see_employee_salary}
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
