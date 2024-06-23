// import { ADD_ALLOWANCE } from "../../../constants/tasks";
// import { setShortTask } from "../../../store/user/user-slice";
import { useContext } from "react";
// import { useAppDispatch } from "../../../utils/custom-hook";
import {
  Caption,
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "./allowance.style";
import { DisplayContext } from "../../../contexts/display-context";
import { useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../salary/utils";
import { NoResult } from "../../utils/containers/containers.style";

export const EmployeeAllowance = () => {
  // const dispatcher = useAppDispatch();
  const { display, setDisplay } = useContext(DisplayContext);
  const { curr_emp } = useAppSelector((state) => state.salary);
  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplay({
              ...display,
              add_overtime: false,
              add_deduction: false,
              add_allowance: true,
              add_employee: false,
            });
            // dispatcher(setShortTask(ADD_ALLOWANCE));
          }}
        >
          Add
        </AddButton>
      </AllowanceHeader>
      <AllowanceBody>
        {curr_emp?.employee.payments.map((payment, index) => {
          return payment.allowances.length > 0 ? (
            <CustomTable key={index}>
              <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
              <TableHeader>
                <HeaderTitle>Allowance Name</HeaderTitle>
                <HeaderTitle>Allowance Value</HeaderTitle>
                <HeaderTitle>Date of Given</HeaderTitle>
              </TableHeader>
              <TableBody>
                {payment.allowances.map((allowance, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{allowance.allowance_type}</TableData>
                      <TableData>{allowance.allowance_rate}</TableData>
                      <TableData>{payment.payment_date}</TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          ) : (
            <div>
              <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
              <NoResult>No Allowance</NoResult>
            </div>
          );
        })}
      </AllowanceBody>
    </AllowanceContainer>
  );
};
