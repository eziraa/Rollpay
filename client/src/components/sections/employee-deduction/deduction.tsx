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
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { listDeductionsRequested } from "../../../store/deduction/deduction-slice";
import { ThreeDots } from "../../utils/loading/dots";
import { useNavigate } from "react-router";

export const EmployeeDeduction = () => {
  const { curr_emp, loading } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  return (
    <DeductionContainer>
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-deduction");
            dispatcher(listDeductionsRequested());
          }}
        >
          Add
        </AddButton>
      </DeductionHeader>
      <DeductionBody>
        {loading ? (
          <ThreeDots size={2} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.deductions.length === 0
          ) ? (
          <div>
            <NoResult>No deductions found for all month</NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.deductions.length > 0 ? (
              <CustomTable key={index}>
                <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
                <TableHeader>
                  <HeaderTitle>Deduction Name</HeaderTitle>
                  <HeaderTitle>Deduction Value</HeaderTitle>
                  <HeaderTitle>Date of Given</HeaderTitle>
                </TableHeader>

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
          })
        )}
      </DeductionBody>
    </DeductionContainer>
  );
};
