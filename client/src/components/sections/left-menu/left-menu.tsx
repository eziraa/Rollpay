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
  SubMenuContainer,
  SubMenuItem,
  ColapseExpand,
} from "./left-menu.style";
import { useLocation, useNavigate } from "react-router";
import Image from "../../../assets/logo.png";
import { Title } from "../add_employee/add-employee.style";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useState } from "react";

function LeftMenu() {
  const { task_finished } = useAppSelector((state) => state.employee);
  const navigate = useNavigate();
  const [colapseEmployees, setColapseEmployees] = useState(true);
  const [colapseSalary, setColapseSalary] = useState(true);

  const salarySubMenuItems = [
    {
      title: "Salary Reports",
      path: "/employees-salary",
      icon: <SalaryIcon />,
    },
    {
      title: "Deductions",
      path: "/payroll-deductions",
      icon: <SalaryIcon />,
    },
    {
      title: "Allowances",
      path: "/payroll-allowances",
      icon: <SalaryIcon />,
    },
    {
      title: "Overtimes",
      path: "/payroll-overtimes",
      icon: <SalaryIcon />,
    },
    // Add more submenu items here...
  ];
  const menuItems = [
    {
      title: "Employees",
      path: "/employees",
      icon: <MdExpandMore />,
    },
    {
      title: "Positions",
      path: "/positions",
      icon: <SalaryIcon />,
    },
    // Add more menu items here...
  ];

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
        onClick={() => {
          setColapseEmployees(!colapseEmployees);
        }}
      >
        <UsersIcon />
        <MenuItemText>All Employees</MenuItemText>
        <ColapseExpand>
          {colapseEmployees ? <MdExpandMore /> : <MdExpandLess />}
        </ColapseExpand>
      </MenuItem>
      {!colapseEmployees && (
        <SubMenuContainer>
          {menuItems.map(({ title, path }) => (
            <SubMenuItem
              key={title}
              active={pathname === path}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(path);
              }}
            >
              <MenuItemText>{title}</MenuItemText>
            </SubMenuItem>
          ))}
        </SubMenuContainer>
      )}
      <MenuItem
        active={pathname.startsWith("/employees-salary")}
        onClick={() => {
          setColapseSalary(!colapseSalary);
        }}
      >
        <SalaryIcon />
        <MenuItemText>Salary</MenuItemText>
        <ColapseExpand>
          {colapseSalary ? <MdExpandMore /> : <MdExpandLess />}
        </ColapseExpand>
      </MenuItem>
      {!colapseSalary && (
        <SubMenuContainer>
          {salarySubMenuItems.map(({ title, path }) => (
            <SubMenuItem
              key={title}
              active={pathname === path}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(path);
              }}
            >
              <MenuItemText>{title}</MenuItemText>
            </SubMenuItem>
          ))}
        </SubMenuContainer>
      )}
    </LeftMenuContainer>
  );
}

export default LeftMenu;
