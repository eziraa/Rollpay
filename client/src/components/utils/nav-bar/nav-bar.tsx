import { useLocation, useNavigate } from "react-router";
import { NavBar, NavItem } from "./nav-bar.style";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NavBar>
      <NavItem
        active={location.pathname.endsWith("allowances")}
        onClick={(e) => {
          e.preventDefault();
          navigate("allowances");
        }}
      >
        Allowances
      </NavItem>
      <NavItem
        active={location.pathname.endsWith("overtimes")}
        onClick={(e) => {
          e.preventDefault();
          navigate(`overtimes`);
        }}
      >
        Overtimes
      </NavItem>
      <NavItem
        active={location.pathname.endsWith("deductions")}
        onClick={(e) => {
          e.preventDefault();
          navigate(`deductions`);
        }}
      >
        Deductions
      </NavItem>
    </NavBar>
  );
};
