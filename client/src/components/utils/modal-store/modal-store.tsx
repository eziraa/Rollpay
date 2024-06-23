import { useModal } from "../../../hooks/modal-hook";
import { AddAllowance } from "../../sections/add-allowance/add-allowance";
import { AddDeduction } from "../../sections/add-deduction/add-deduction";
import { AddOvertime } from "../../sections/add-overtime/add-overtime";
import { AddPosition } from "../../sections/add-position/add-position";
import { AddEmployee } from "../../sections/add_employee/add-employee";

export const ModalStore = () => {
  const { modal } = useModal();
  return (
    <>
      {modal.add_allowance && <AddAllowance />}
      {modal.add_overtime && <AddOvertime />}
      {modal.add_deduction && <AddDeduction />}
      {modal.add_position && <AddPosition />}
      {modal.add_employee && <AddEmployee />}
    </>
  );
};
