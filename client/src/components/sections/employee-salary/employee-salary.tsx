import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "../employee-allowance/allowance.style";

import { ThreeDots } from "../../utils/loading/dots";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import { useEffect } from "react";

import { NoResult } from "../../utils/containers/containers.style";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { useSalary } from "../../../hooks/salary-hook";

export const EmployeeSalary = () => {
  const { employee_id } = useParams();
  const dispatcher = useAppDispatch();
  const { task_finished, curr_emp } = useSalary();
  useEffect(() => {
    if (employee_id) dispatcher(getCurrEmpPaymentInfo(employee_id));
  }, [dispatcher, employee_id]);

  const salaryHistory = curr_emp?.employee.payments.flatMap(
    (payment) => payment.salary_history
  );

  const uniqueSalaryHistory = Array.from(
    new Set(salaryHistory?.map((salary) => JSON.stringify(salary)))
  ).map((str) => JSON.parse(str));

  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <Outlet />
        <AllowanceTitle>Employee Salary History</AllowanceTitle>
      </AllowanceHeader>
      <AllowanceBody>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : uniqueSalaryHistory.length === 0 ? (
          <div>
            <NoResult>No salary history found</NoResult>
          </div>
        ) : (
          <CustomTable>
            <thead>
              <TableHeader>
                <HeaderTitle>From</HeaderTitle>
                <HeaderTitle>To</HeaderTitle>
                <HeaderTitle>Salary</HeaderTitle>
              </TableHeader>
            </thead>
            <TableBody>
              {uniqueSalaryHistory.map((salary, index) => (
                <TableRow key={index}>
                  <TableData>{salary.from}</TableData>
                  <TableData>{salary.to}</TableData>
                  <TableData>{salary.salary}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </CustomTable>
        )}
      </AllowanceBody>
    </AllowanceContainer>
  );
};
