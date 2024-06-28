import { useNavigate } from "react-router";
import { NavBar, NavItem } from "./nav-bar.style";
import {
  SEE_EMP_ALLOWANCE,
  SEE_EMP_DEDUCTION,
  SEE_EMP_OVERTIME,
} from "../../../constants/tasks";

export const NavigationBar = ({ current_nav }: { current_nav: string }) => {
  const navigate = useNavigate();
  return (
    <NavBar>
      <NavItem
        active={current_nav === SEE_EMP_ALLOWANCE}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/single-employee");
        }}
      >
        Allowances
      </NavItem>
      <NavItem
        active={current_nav === SEE_EMP_OVERTIME}
        onClick={(e) => {
          e.preventDefault();
          navigate("/employees/employee-overtimes");
        }}
      >
        Overtimes
      </NavItem>
      <NavItem
        active={current_nav == SEE_EMP_DEDUCTION}
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
