import { useState } from "react";
import { ModalContext, ModalInterface } from "../contexts/modal-context";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalInterface>({
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
  });

  const openModal = (name: string) => {
    setModal({
      ...modal,
      [name]: true,
    });
  };
  const closeModal = (name: string) => {
    setModal({
      ...modal,
      [name]: false,
    });
  };
  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
