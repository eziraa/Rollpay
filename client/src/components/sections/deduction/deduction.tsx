// import { ADD_DEDUCTION } from "../../../constants/tasks";
// import { setShortTask } from "../../../store/user/user-slice";
import { useContext } from "react";
// import { useAppDispatch } from "../../../utils/custom-hook";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  Caption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  DeductionBody,
  DeductionContainer,
  DeductionHeader,
  DeductionTitle,
} from "./deduction.style";
import { DisplayContext } from "../../../contexts/display-context";
import { useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../salary/utils";
import { NoResult } from "../../utils/containers/containers.style";

export const EmployeeDeduction = () => {
  // const dispatcher = useAppDispatch();
  const { display, setDisplay } = useContext(DisplayContext);
  const { curr_emp } = useAppSelector((state) => state.salary);

  return (
    <DeductionContainer>
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplay({
              ...display,
              add_overtime: false,
              add_deduction: true,
              add_allowance: false,
              add_employee: false,
            });
          }}
        >
          Add
        </AddButton>
      </DeductionHeader>
      <DeductionBody>
        {curr_emp?.employee.payments.map((payment, index) => {
          return payment.allowances.length > 0 ? (
            <CustomTable key={index}>
              <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
              <TableHeader>
                <HeaderTitle>Deduction Name</HeaderTitle>
                <HeaderTitle>Deduction Value</HeaderTitle>
                <HeaderTitle>Date of Given</HeaderTitle>
              </TableHeader>
              (
              <TableBody>
                {payment.deductions.map((deduction, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{deduction.deduction_type}</TableData>
                      <TableData>{deduction.deduction_rate}</TableData>
                      <TableData>
                        {new Date(payment.payment_date).toLocaleDateString()}
                      </TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          ) : (
            <div>
              <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
              <NoResult>No Deduction</NoResult>
            </div>
          );
        })}
      </DeductionBody>
    </DeductionContainer>
  );
};
