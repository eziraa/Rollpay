/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import {
  CustomTable,
  HeaderTitle,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import { SalaryContainer, SearchContainer, SearchInput } from "./salary.style";
import { SearchIcon } from "../../utils/search/search.style";
import { Header, Title } from "../display-employee/display-employee.style";
import { searching } from "../../../store/employee/employee-slice";

export const Salary = () => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.employee);

  const [allowanceTypes, setAllowanceTypes] = useState<string[]>([]);
  const [deductionTypes, setDeductionTypes] = useState<string[]>([]);
  const { response } = useAppSelector((state) => state.salary);

  const startSearch = (param: string) => {
    const lookUp = param.toLowerCase();

    const employees =
      employee!.employees?.filter((employee) =>
        employee.first_name.toLowerCase().startsWith(lookUp)
      ) ?? [];
    dispatch(searching(employees));
  };

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
  const getSalary = (salary: number | null) => {
    if (salary) {
      return (salary * 1.0).toFixed(2);
    }
    return "-";
  };

  const getRate = (rate: number | undefined) => {
    if (rate) {
      return (rate * 1.0).toFixed(2) + "%";
    }
    return (
      <span
        style={{
          textAlign: "center",
          width: "50%",
          display: "inline-block",
        }}
      >
        -
      </span>
    );
  };

  return (
    <SalaryContainer>
      <Header>
        <Title>Employees Payroll</Title>
      </Header>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          onInput={(e) => {
            e.preventDefault();
            startSearch(e.currentTarget.value);
          }}
        />
      </SearchContainer>
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
                    {getRate(
                      employee.salary.allowances.find(
                        (alowance) => alowance.allowance_type === allowanceType
                      )?.allowance_rate
                    )}
                  </TableData>
                );
              })}
              <TableData>{getSalary(employee.salary.gross_salary)}</TableData>
              <TableData>{employee.salary.basic_salary * 1.3}</TableData>
              {deductionTypes.map((deductionType) => {
                return (
                  <TableData>
                    {getRate(
                      employee.salary.deductions.find(
                        (deduction) =>
                          deduction.deduction_type === deductionType
                      )?.deduction_rate
                    )}
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
