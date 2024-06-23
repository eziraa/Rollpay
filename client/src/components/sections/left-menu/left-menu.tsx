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

function LeftMenu() {
  const { loading } = useAppSelector((state) => state.employee);
  // const { long_task } = useAppSelector((state) => state.user);
  const { display, setDisplay } = useContext(DisplayContext);
  return (
    <LeftMenuContainer>
      <MenuItem
        active={!display.list_employees && !display.see_employee_salary}
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
          setDisplay({
            ...display,
            list_employees: true,
            see_employee_salary: false,
            see_employee: false
          });
          // dispatcher(setLongTask(LIST_EMP_S));
        }}
      >
        <UsersIcon />
        <MenuItemText>All Employees</MenuItemText>
      </MenuItem>
      <MenuItem
        active={display.see_employee_salary}
        onClick={() => {
          if (loading) return;
          setDisplay({
            ...display,
            list_employees: false,
            see_employee_salary: true,
            search_employee: false,
            see_employee: false
          });
        }}
      >
        <SalaryIcon />
        <MenuItemText>Employees Salary</MenuItemText>
      </MenuItem>
    </LeftMenuContainer>
  );
}

export default LeftMenu;
