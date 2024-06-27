import { useNavigate } from "react-router";
import { NavBar, NavItem } from "./nav-bar.style";

export const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <NavBar>
      <NavItem
        active={true}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/single-employee");
        }}
      >
        Allowances
      </NavItem>
      <NavItem
        active={false}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/employee-overtimes");
        }}
      >
        Overtimes
      </NavItem>
      <NavItem
        active={true}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/employee-deductions");
        }}
      >
        Deductions
      </NavItem>
    </NavBar>
  );
};
