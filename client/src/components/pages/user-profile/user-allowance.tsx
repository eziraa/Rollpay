import { useAppSelector } from "../../../utils/custom-hook";
import {
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "../../sections/employee-allowance/allowance.style";
import { getFormattedMonth } from "../salary/utils";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  Caption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";

const UserAllowance = () => {
  const payments = useAppSelector(
    (state) => state.salary.curr_emp?.employee.payments
  );
  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
      </AllowanceHeader>
      <AllowanceBody>
        {payments?.map((payment, index) => {
          return (
            <CustomTable key={index}>
              <Caption>{getFormattedMonth(new Date(payment.month))} </Caption>
              <TableHeader>
                <HeaderTitle>Allowance Name</HeaderTitle>
                <HeaderTitle>Allowance Value</HeaderTitle>
                <HeaderTitle>Date of Payment</HeaderTitle>
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
          );
        })}
      </AllowanceBody>
    </AllowanceContainer>
  );
};

export default UserAllowance;
