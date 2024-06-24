import { useState } from "react";
import { ModalContext, ModalInterface } from "../contexts/modal-context";
import { ADD_POSITION, CLOSE_MODAL } from "../constants/tasks";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalInterface>({
    add_employee: false,
    add_allowance: false,
    add_deduction: false,
    add_overtime: false,
    add_position: false,
  });

  const openModal = (name: string) => {
    Object.entries(modal).map(([key, isOpened]) => {
      if (name === CLOSE_MODAL) {
        if (isOpened) {
          if (isOpened && key === ADD_POSITION)
            setModal({ ...modal, [key]: false, add_employee: true });
          else setModal({ ...modal, [key]: false });
        }
      } else if (key !== name) {
        setModal({
          ...modal,
          [key]: false,
        });
      }
    });

    name !== CLOSE_MODAL &&
      setModal({
        ...modal,
        [name]: true,
      });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};
