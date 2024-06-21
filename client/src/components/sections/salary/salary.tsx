/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import {
  HeaderTitle,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  SalaryContainer,
  SalaryTable,
  SearchContainer,
  SearchInput,
} from "./salary.style";
import { SearchIcon } from "../../utils/search/search.style";
import { Header, Title } from "../display-employee/display-employee.style";
import { Select, SelectOption } from "../../utils/form-elements/form.style";
import { searchEmployeeRequested } from "../../../store/salary/salary-slice";
import { Employee } from "../../../typo/salary/response";
import Pagination from "../pagination/pagination";
import LoadingSpinner from "../../utils/spinner/spinner";

export const Salary = () => {
  const dispatcher = useAppDispatch();
  const salary = useAppSelector((state) => state.salary);
  const [searchBy, setSearchBy] = useState("first_name");

  const [allowanceTypes, setAllowanceTypes] = useState<string[]>([]);
  const [deductionTypes, setDeductionTypes] = useState<string[]>([]);
  const { response } = useAppSelector((state) => state.salary);
  const [search_val, setSearchVal] = useState<string>("");

  useEffect(() => {
    const loadEmployee = setTimeout(() => {
      dispatcher(
        searchEmployeeRequested({
          search_by: searchBy,
          search_value: search_val,
        })
      );
    }, 500);

    return () => clearTimeout(loadEmployee);
  }, [search_val]);
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
          width: "100%",
          display: "inline-block",
        }}
      >
        -
      </span>
    );
  };

  const [employeeSalary, setEmployeeSalary] = useState<Employee[]>([]);

  useEffect(() => {
    if (salary.searching && salary.search_response)
      setEmployeeSalary(salary.search_response || []);
    else setEmployeeSalary(salary.response?.employees || []);
  }, [salary.response, salary.search_response]);

  return (
    <SalaryContainer>
      <Header>
        <Title>Employees Payroll</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            onChange={(e) => {
              // dispatcher(setLongTask(SEARCH_EMPLOYEE_SALARY));
              setSearchVal(e.currentTarget.value);
            }}
          />
        </SearchContainer>
        <Select
          style={{
            width: "15rem",
          }}
          name="search-by"
          onChange={(e) => {
            setSearchBy(e.currentTarget.value);
          }}
        >
          <SelectOption value="name">Name</SelectOption>
          <SelectOption value="id">ID</SelectOption>
        </Select>
      </Header>
      {salary.loading ? (
        <LoadingSpinner />
      ) : (
        <SalaryTable>
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
          {employeeSalary
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
                          (alowance) =>
                            alowance.allowance_type === allowanceType
                        )?.allowance_rate
                      )}
                    </TableData>
                  );
                })}
                <TableData>{getSalary(employee.salary.gross_salary)}</TableData>
                <TableData>{getSalary(employee.salary.income_tax)}</TableData>
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
                <TableData>{employee.salary.total_deduction}</TableData>
                <TableData>{employee.salary.net_salary}</TableData>
                <TableData> Not Paid </TableData>
              </TableRow>
            ))}
        </SalaryTable>
      )}
      <Pagination />
    </SalaryContainer>
  );
};
