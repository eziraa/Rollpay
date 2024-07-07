import { useLocation, useNavigate } from "react-router";
import { NavBar, NavItem } from "./nav-bar.style";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NavBar className="nav-bar">
      <NavItem
        active={location.pathname.includes("/allowances")}
        onClick={(e) => {
          e.preventDefault();
          navigate("allowances");
        }}
      >
        Allowances
      </NavItem>
      <NavItem
        active={location.pathname.includes("/overtimes")}
        onClick={(e) => {
          e.preventDefault();
          navigate(`overtimes`);
        }}
      >
        Overtimes
      </NavItem>
      <NavItem
        active={location.pathname.includes("/deductions")}
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
