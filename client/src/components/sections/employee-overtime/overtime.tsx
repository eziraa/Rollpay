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
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { ThreeDots } from "../../utils/loading/dots";
import { listOvertimesRequested } from "../../../store/overtime/overtime-slice";
import { Outlet, useNavigate } from "react-router";

export const EmployeeOvertime = () => {
  const { curr_emp, loading } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  return (
    <OvertimeContainer>
      <OvertimeHeader>
        <Outlet />
        <OvertimeTitle>Employee Overtime</OvertimeTitle>
        <AddButton
          onClick={(e) => {
            e.stopPropagation();
            dispatcher(listOvertimesRequested());
            navigate("add-overtime");
          }}
        >
          Add
        </AddButton>
      </OvertimeHeader>
      <OvertimeBody>
        {loading ? (
          <ThreeDots size={2} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.overtimes.length === 0
          ) ? (
          <div>
            <NoResult>No overtimes found for all month</NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.overtimes.length > 0 ? (
              <CustomTable key={index}>
                <thead>
                  <tr>
                    <Caption>
                      {getFormattedMonth(new Date(payment.month))}
                    </Caption>
                  </tr>
                  <TableHeader>
                    <HeaderTitle>Overtime Name</HeaderTitle>
                    <HeaderTitle>Overtime Value</HeaderTitle>
                    <HeaderTitle>Length of Time</HeaderTitle>
                    <HeaderTitle>Date of Given</HeaderTitle>
                  </TableHeader>
                </thead>
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
          })
        )}
      </OvertimeBody>
    </OvertimeContainer>
  );
};
