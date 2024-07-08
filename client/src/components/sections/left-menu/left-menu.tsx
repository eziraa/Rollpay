/* eslint-disable react-hooks/exhaustive-deps */
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
  Close,
} from "./left-menu.style";
import { useLocation, useNavigate } from "react-router";
import Image from "../../../assets/logo.png";
import { Title } from "../add_employee/add-employee.style";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useRefs } from "../../../hooks/refs-hook";

function LeftMenu() {
  const { task_finished } = useAppSelector((state) => state.employee);
  const navigate = useNavigate();
  const [colapseEmployees, setColapseEmployees] = useState(true);
  const [colapseSalary, setColapseSalary] = useState(true);
  const { refs, setRefs } = useRefs();
  const leftMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRefs({ ...refs, leftMenuRef });
  }, []);
  const salarySubMenuItems = [
    {
      title: "Employees Payroll",
      path: "/employees-salary",
      icon: <SalaryIcon />,
    },
    {
      title: "Deductions",
      path: "/deductions",
      icon: <SalaryIcon />,
    },
    {
      title: "Allowances",
      path: "/allowances",
      icon: <SalaryIcon />,
    },
    {
      title: "Overtimes",
      path: "/overtimes",
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
    <div
      className="left-menu-modal"
      ref={leftMenuRef}
      onClick={() => {
        leftMenuRef &&
          leftMenuRef.current &&
          leftMenuRef.current.classList.toggle("collapsed");
      }}
    >
      <LeftMenuContainer
        className="left-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <Close
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            leftMenuRef &&
              leftMenuRef.current &&
              leftMenuRef.current.classList.toggle("collapsed");
          }}
        />
        <LogoContainer>
          <LogoImage src={Image} />
          <Title>
            Payroll
            <span
              style={{
                color: "#1e8054",
              }}
            >
              roll
            </span>
          </Title>
        </LogoContainer>
        <MenuItem
          active={pathname === "/"}
          onClick={(e) => {
            if (!task_finished) return;
            e.preventDefault();
            navigate("/");
          }}
        >
          <HomeIcon />
          <MenuItemText>Home</MenuItemText>
        </MenuItem>
        <MenuItem
          active={pathname.endsWith("/employees")}
          onClick={(e) => {
            e.stopPropagation();
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
          onClick={(e) => {
            e.stopPropagation();
            setColapseSalary(!colapseSalary);
          }}
        >
          <SalaryIcon />
          <MenuItemText>Payroll</MenuItemText>
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
                  navigate(path);
                }}
              >
                <MenuItemText>{title}</MenuItemText>
              </SubMenuItem>
            ))}
          </SubMenuContainer>
        )}
      </LeftMenuContainer>
    </div>
  );
}

export default LeftMenu;
