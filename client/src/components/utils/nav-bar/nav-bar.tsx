import { NavBar, NavItem } from "./nav-bar.style";

export const NavigationBar = () => {
  return (
    <NavBar>
      <NavItem
        active={true}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Allowances
      </NavItem>
      <NavItem
        active={false}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Overtimes
      </NavItem>
      <NavItem
        active={true}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Deductions
      </NavItem>
    </NavBar>
  );
};
