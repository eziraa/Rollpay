import { Header } from "../../sections/header/header";
import { HomeBody, HomeContainer } from "./home-page.style";
import LeftMenu from "../../sections/left-menu/left-menu";

import { Outlet } from "react-router";
import { HomeIcon, SalaryIcon } from "../../sections/left-menu/left-menu.style";
import { MdExpandMore } from "react-icons/md";
import { MenuItemInterface } from "../../../typo/menu/props";
import { useState } from "react";
import { FaUsers } from "react-icons/fa6";

export const HomePage = () => {
  const [colapseEmployees, setColapseEmployees] = useState(false);
  const [colapseSalary, setColapseSalary] = useState(false);

  const menuItems: MenuItemInterface[] = [
    {
      title: "Home",
      path: "/",
      icon: <HomeIcon />,
      sub_menu_items: [],
    },
    {
      title: "Employees",
      path: "/employees",
      icon: <FaUsers />,
      exapandItems: setColapseEmployees,
      items_expanded: colapseEmployees,
      sub_menu_items: [
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
      ],
    },
    {
      title: "Payroll",
      icon: <SalaryIcon />,
      path: "/payroll",
      items_expanded: colapseSalary,
      exapandItems: setColapseSalary,
      sub_menu_items: [
        {
          title: "Employees Payroll",
          path: "/payroll",
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
      ],
    },

    // Add more menu items here...
  ];

  return (
    <HomeContainer>
      <LeftMenu menu_items={menuItems} />
      <HomeBody>
        <Header />
        <Outlet />
      </HomeBody>
    </HomeContainer>
  );
};

export const ClerkPage = () => {
  return (
    <HomeContainer>
      <Outlet />
    </HomeContainer>
  );
};
