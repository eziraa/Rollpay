import { useAppSelector } from "../../../utils/custom-hook";
import {
  SalaryIcon,
  HomeIcon,
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  UsersIcon,
  LogoContainer,
  LogoImage,
} from "./left-menu.style";
import { useLocation, useNavigate } from "react-router";
import Image from "../../../assets/logo.jpg";
import { Title } from "../add_employee/add-employee.style";

function LeftMenu() {
  const { task_finished } = useAppSelector((state) => state.employee);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <LeftMenuContainer>
      <LogoContainer>
        <LogoImage src={Image} />
        <Title>
          Ethio
          <span
            style={{
              color: "red",
            }}
          >
            Den
          </span>
        </Title>
      </LogoContainer>
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
