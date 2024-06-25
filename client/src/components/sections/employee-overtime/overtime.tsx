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
  OvertimeBody,
  OvertimeContainer,
  OvertimeHeader,
  OvertimeTitle,
} from "./overtime.style";
import { useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_OVERTIME_TO_EMP } from "../../../constants/tasks";

export const EmployeeOvertime = () => {
  const { curr_emp } = useAppSelector((state) => state.salary);
  const { openModal } = useModal();
  return (
    <OvertimeContainer>
      <OvertimeHeader>
        <OvertimeTitle>Employee Overtime</OvertimeTitle>
        <AddButton
          onClick={(e) => {
            e.stopPropagation();
            openModal(ADD_OVERTIME_TO_EMP);
          }}
        >
          Add
        </AddButton>
      </OvertimeHeader>
      <OvertimeBody>
        {curr_emp?.employee.payments.map((payment, index) => {
          return payment.overtimes.length > 0 ? (
            <CustomTable key={index}>
              <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
              <TableHeader>
                <HeaderTitle>Overtime Name</HeaderTitle>
                <HeaderTitle>Overtime Value</HeaderTitle>
                <HeaderTitle>Length of Time</HeaderTitle>
                <HeaderTitle>Date of Given</HeaderTitle>
              </TableHeader>
              <TableBody>
                {payment.overtimes.map((overtime, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{overtime.overtime_type}</TableData>
                      <TableData>{overtime.overtime_rate}</TableData>
                      <TableData>{overtime.length}</TableData>
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
              <NoResult>No Overtime</NoResult>
            </div>
          );
        })}
      </OvertimeBody>
    </OvertimeContainer>
  );
};
