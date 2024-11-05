import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  Body,
  Container,
  Header,
  Title,
} from "../employee-allowance/allowance.style";

import { ThreeDots } from "../../utils/loading/dots";

import { useEffect } from "react";

import { NoResult } from "../../utils/containers/containers.style";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { useSalary } from "../../../hooks/salary-hook";
import { CustomTable } from "../employee-overtime/table";

export const EmployeePosition = () => {
  const { employee_id } = useParams();
  const dispatcher = useAppDispatch();
  const { task_finished, curr_emp } = useSalary();
  useEffect(() => {
    if (employee_id) dispatcher(getCurrEmpPaymentInfo(employee_id));
  }, [dispatcher, employee_id]);

  const position_history = curr_emp?.employee.payments.flatMap(
    (payment) => payment.position_history
  );

  const uniqueSalaryHistory = Array.from(
    new Set(position_history?.map((salary) => JSON.stringify(salary)))
  ).map((str) => JSON.parse(str));

  return (
    <Container>
      <Header>
        <Outlet />
        <Title>Employee Position History</Title>
      </Header>
      <Body>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : uniqueSalaryHistory.length === 0 ? (
          <div>
            <NoResult>No salary history found</NoResult>
          </div>
        ) : (
          <CustomTable className="shadow-md" gridCols="1fr 1fr 1fr">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {uniqueSalaryHistory.map((salary, index) => (
                <tr key={index}>
                  <td>{salary.start_date}</td>
                  <td>{salary.end_date}</td>
                  <td>{salary.position_name}</td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        )}
      </Body>
    </Container>
  );
};
