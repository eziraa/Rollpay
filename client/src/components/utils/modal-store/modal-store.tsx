import { useModal } from "../../../hooks/modal-hook";
import { AddAllowance } from "../../sections/add-allowance/add-allowance";
import { AddDeduction } from "../../sections/add-deduction/add-deduction";
import { AddOvertime } from "../../sections/add-overtime/add-overtime";
import { AddPosition } from "../../sections/add-position/add-position";
import { AddEmployee } from "../../sections/add_employee/add-employee";
import { AddAllowanceToEmp } from "../../pages/see-employee/add-allowance";
import { AddDeductionToEmp } from "../../pages/see-employee/add-deduction";
import { AddOvertimeToEmp } from "../../pages/see-employee/add-overtime";

export const ModalStore = () => {
  const { modal } = useModal();
  return (
    <>
      {modal.add_allowance_to_emp && <AddAllowanceToEmp />}
      {modal.add_deduction_to_emp && <AddDeductionToEmp />}
      {modal.add_overtime_to_emp && <AddOvertimeToEmp />}
      {modal.add_allowance && <AddAllowance />}
      {modal.add_overtime && <AddOvertime />}
      {modal.add_deduction && <AddDeduction />}
      {modal.add_employee && <AddEmployee />}
      {modal.add_position && <AddPosition />}
    </>
  );
};
