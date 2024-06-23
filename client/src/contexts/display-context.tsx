import { createContext } from "react";

export interface DisplayInterface {
  add_employee: boolean;
  edit_employee: boolean;
  list_employees: boolean;
  add_allowance: boolean;
  add_deduction: boolean;
  add_overtime: boolean;
  see_employee: boolean;
  see_employee_allowance: boolean;
  see_employee_deduction: boolean;
  see_employee_overtime: boolean;
  see_employee_salary: boolean;
  see_profile: boolean;
  search_employee: boolean;
  search_employee_salary: boolean;
}

export interface DisplayContextInterface {
  display: DisplayInterface;
  setDisplay: (display: DisplayInterface) => void;
}
export const DisplayContext = createContext<DisplayContextInterface>({
  display: {
    add_employee: false,
    edit_employee: false,
    list_employees: false,
    add_allowance: false,
    add_deduction: false,
    add_overtime: false,
    see_employee: false,
    see_employee_allowance: false,
    see_employee_deduction: false,
    see_employee_overtime: false,
    see_employee_salary: false,
    see_profile: false,
    search_employee: false,
    search_employee_salary: false,
  },
  setDisplay: () => {},
});
