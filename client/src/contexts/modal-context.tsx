import { createContext } from "react";

export interface ModalInterface {
  add_employee: boolean;
  add_allowance: boolean;
  add_deduction: boolean;
  add_overtime: boolean;
  add_position: boolean;
}

export interface ModalContextInterface {
  modal: ModalInterface;
  openModal: (section: string) => void;
}
export const ModalContext = createContext<ModalContextInterface>({
  modal: {
    add_employee: false,
    add_allowance: false,
    add_deduction: false,
    add_overtime: false,
    add_position: false,
  },
  openModal: () => {},
});
