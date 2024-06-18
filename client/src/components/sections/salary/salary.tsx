/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../utils/custom-hook";
import {
  CustomTable,
  HeaderTitle,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import { SalaryContainer, SalaryTitle } from "./salary.style";

export const Salary = () => {
  const [allowanceTypes, setAllowanceTypes] = useState<string[]>([]);
  const [deductionTypes, setDeductionTypes] = useState<string[]>([]);
  const { response } = useAppSelector((state) => state.salary);

  useEffect(() => {
    const tempAllowanceTypes = new Set<string>();
    const tempDeductionTypes = new Set<string>();

    response?.employees.forEach((employee) => {
      if (employee.salary) {
        employee.salary.allowances.forEach((allowance) => {
          tempAllowanceTypes.add(allowance.allowance_type);
        });
        employee.salary.deductions.forEach((deduction) => {
          tempDeductionTypes.add(deduction.deduction_type);
        });
      }
    });

    setAllowanceTypes(Array.from(tempAllowanceTypes));
    setDeductionTypes(Array.from(tempDeductionTypes));
  }, [response]);
  return (
    <SalaryContainer>
      <SalaryTitle>Salary</SalaryTitle>
      <CustomTable>
        <TableHeader>
          <HeaderTitle rowSpan={2}>Employee ID</HeaderTitle>
          <HeaderTitle rowSpan={2}>Employee Name</HeaderTitle>
          <HeaderTitle rowSpan={2}>Basic Salary</HeaderTitle>
          <HeaderTitle
            style={{
              textAlign: "center",
            }}
            colSpan={allowanceTypes.length}
          >
            Allowance
          </HeaderTitle>
          <HeaderTitle rowSpan={2}>Gross Sallary</HeaderTitle>
          <HeaderTitle
            style={{
              textAlign: "center",
            }}
            colSpan={deductionTypes.length + 1}
          >
            Deduction
          </HeaderTitle>
          <HeaderTitle rowSpan={2}>Total Deduction</HeaderTitle>
          <HeaderTitle rowSpan={2}>Net Pay</HeaderTitle>
          <HeaderTitle rowSpan={2}>Payment</HeaderTitle>
        </TableHeader>
        <TableHeader>
          {allowanceTypes.map((allowanceType) => {
            return <HeaderTitle> {allowanceType} </HeaderTitle>;
          })}
          <HeaderTitle>Income Tax</HeaderTitle>
          {deductionTypes.map((deductionType) => {
            return <HeaderTitle> {deductionType} </HeaderTitle>;
          })}
        </TableHeader>
        {response?.employees
          .filter((employee) => employee.salary)
          .map((employee) => (
            <TableRow key={employee.id}>
              <TableData>{employee.id}</TableData>
              <TableData>
                {employee.first_name + " " + employee.last_name}
              </TableData>
              <TableData>{employee.salary.basic_salary}</TableData>
              {allowanceTypes.map((allowanceType) => {
                return (
                  <TableData>
                    {
                      employee.salary.allowances.find(
                        (alowance) => alowance.allowance_type === allowanceType
                      )?.allowance_rate
                    }
                  </TableData>
                );
              })}
              <TableData>{employee.salary.basic_salary * 1.3}</TableData>
              <TableData>
                {(employee.salary.basic_salary * 0.1).toFixed(2)}
              </TableData>
              {deductionTypes.map((deductionType) => {
                return (
                  <TableData>
                    {
                      employee.salary.deductions.find(
                        (deduction) =>
                          deduction.deduction_type === deductionType
                      )?.deduction_rate
                    }
                  </TableData>
                );
              })}
              <TableData>{employee.salary.basic_salary * 1.5}</TableData>
              <TableData>{employee.salary.basic_salary * 0.9}</TableData>
              <TableData> Not Paid </TableData>
            </TableRow>
          ))}
      </CustomTable>
    </SalaryContainer>
  );
};
