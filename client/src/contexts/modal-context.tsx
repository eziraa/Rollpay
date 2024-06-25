import { createContext } from "react";

export interface ModalInterface {
  add_employee: boolean;
  add_allowance: boolean;
  add_deduction: boolean;
  add_overtime: boolean;
  add_position: boolean;
  add_employee_to_emp: boolean;
  add_allowance_to_emp: boolean;
  add_deduction_to_emp: boolean;
  add_overtime_to_emp: boolean;
  add_position_to_emp: boolean;
}

export interface ModalContextInterface {
  modal: ModalInterface;
  openModal: (section: string) => void;
  closeModal: (section: string) => void;
}
export const ModalContext = createContext<ModalContextInterface>({
  modal: {
    add_employee: false,
    add_allowance: false,
    add_deduction: false,
    add_overtime: false,
    add_position: false,
    add_employee_to_emp: false,
    add_allowance_to_emp: false,
    add_deduction_to_emp: false,
    add_overtime_to_emp: false,
    add_position_to_emp: false,
  },
  openModal: () => {},
  closeModal: () => {},
});
