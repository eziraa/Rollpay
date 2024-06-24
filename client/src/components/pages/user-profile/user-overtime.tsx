import { useAppSelector } from "../../../utils/custom-hook";
import {
  OvertimeBody,
  OvertimeContainer,
  OvertimeHeader,
  OvertimeTitle,
} from "../../sections/employee-overtime/overtime.style";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  Caption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";

const UserOvertime = () => {
  const payments = useAppSelector(
    (state) => state.salary.curr_emp?.employee.payments
  );
  return (
    <OvertimeContainer>
      <OvertimeHeader>
        <OvertimeTitle>Employee Overtime</OvertimeTitle>
      </OvertimeHeader>
      <OvertimeBody>
        {payments?.map((payment, index) => {
          return (
            <CustomTable key={index}>
              <Caption>{payment.month} 2024 </Caption>
              <TableHeader>
                <HeaderTitle>Overtime Name</HeaderTitle>
                <HeaderTitle>Overtime Value</HeaderTitle>
                <HeaderTitle>Length of Time</HeaderTitle>
                <HeaderTitle>Payment Date</HeaderTitle>
              </TableHeader>
              <TableBody>
                {payment.overtimes.map((overtime, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{overtime.overtime_type}</TableData>
                      <TableData>{overtime.overtime_type}</TableData>
                      <TableData>{overtime.length}</TableData>
                      <TableData>
                        {new Date(payment.payment_date).toLocaleDateString()}
                      </TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          );
        })}
      </OvertimeBody>
    </OvertimeContainer>
  );
};

export default UserOvertime;
