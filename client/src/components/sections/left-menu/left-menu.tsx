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
import Image from "../../../assets/logo.png";
import { Title } from "../add_employee/add-employee.style";
import { MdExpandMore } from "react-icons/md";

function LeftMenu() {
  const { task_finished } = useAppSelector((state) => state.employee);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <LeftMenuContainer>
      <LogoContainer>
        <LogoImage src={Image} />
        <Title>
          Payroll
          <span
            style={{
              color: "#2dc682",
            }}
          ></span>
        </Title>
      </LogoContainer>
      <MenuItem
        active={pathname === "/"}
        onClick={(e) => {
          if (!task_finished) return;
          e.preventDefault();
          e.stopPropagation();
          navigate("/");
        }}
      >
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
        <MdExpandMore />
      </MenuItem>
      <MenuItem
        active={pathname.startsWith("/employees-salary")}
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
