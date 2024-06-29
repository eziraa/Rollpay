import { useLocation, useNavigate } from "react-router";
import { NavBar, NavItem } from "./nav-bar.style";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NavBar>
      <NavItem
        active={location.pathname.endsWith("/employees/employee")}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/employee");
        }}
      >
        Allowances
      </NavItem>
      <NavItem
        active={location.pathname.endsWith("overtimes")}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/employee/employee-overtimes");
        }}
      >
        Overtimes
      </NavItem>
      <NavItem
        active={location.pathname.endsWith("deductions")}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/employee/employee-deductions");
        }}
      >
        Deductions
      </NavItem>
    </NavBar>
  );
};
