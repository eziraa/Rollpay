import { useAppSelector } from "../../../utils/custom-hook";
import {
  DeductionBody,
  DeductionContainer,
  DeductionHeader,
  DeductionTitle,
} from "../../sections/employee-deduction/deduction.style";
import { getFormattedMonth } from "../../sections/salary/utils";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  Caption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";

const UserDeductions = () => {
  const payments = useAppSelector(
    (state) => state.salary.curr_emp?.employee.payments
  );
  return (
    <DeductionContainer>
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
      </DeductionHeader>
      <DeductionBody>
        {payments?.map((payment, index) => {
          return (
            <CustomTable key={index}>
              <Caption>
                {getFormattedMonth(new Date(payment.payment_date))}{" "}
              </Caption>
              <TableHeader>
                <HeaderTitle>Deduction Name</HeaderTitle>
                <HeaderTitle>Deduction Value</HeaderTitle>
                <HeaderTitle>Payment Date</HeaderTitle>
              </TableHeader>
              <TableBody>
                {payment.deductions.map((deduction, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{deduction.deduction_type}</TableData>
                      <TableData>{deduction.deduction_rate}</TableData>
                      <TableData>{payment.payment_date}</TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          );
        })}
      </DeductionBody>
    </DeductionContainer>
  );
};

export default UserDeductions;
