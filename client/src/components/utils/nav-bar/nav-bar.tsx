import { useLocation, useNavigate, useParams } from "react-router";
import { NavBar, NavItem } from "./nav-bar.style";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee_id } = useParams();
  return (
    <NavBar>
      <NavItem
        active={location.pathname.endsWith(employee_id || "")}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/employee/" + employee_id);
        }}
      >
        Allowances
      </NavItem>
      <NavItem
        active={location.pathname.endsWith("overtimes")}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/employees/employee/${employee_id}/employee-overtimes`);
        }}
      >
        Overtimes
      </NavItem>
      <NavItem
        active={location.pathname.endsWith("deductions")}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/employees/employee/${employee_id}/employee-deductions`);
        }}
      >
        Deductions
      </NavItem>
    </NavBar>
  );
};
