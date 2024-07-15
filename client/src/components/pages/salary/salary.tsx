/* eslint-disable @typescript-eslint/no-unused-vars */
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
  ExportButton,
  ExportIcon,
  StartPaymentBtn,
  // ExportLabel,
} from "./salary.style";
import { SearchIcon } from "../../utils/search/search.style";
import {
  EmpsDisplayerHeader,
  Title,
} from "../display-employee/display-employee.style";
import { Select, SelectOption } from "../../utils/form-elements/form.style";
import {
  loadNextPaymentListPage,
  searchPaymentRequested,
} from "../../../store/salary/salary-slice";
import Pagination from "../../sections/pagination/pagination";
import LoadingSpinner from "../../utils/spinner/spinner";
import {
  getAllowancesTypes,
  getDeductionTypes,
  getFormattedMonth,
  getNamedMonth,
  getRate,
  getSalary,
} from "./utils";
import { Label } from "../../sections/profile/profile.style";
import { PaymentEmployee } from "../../../typo/payment/response";
import { usePagination } from "../../../hooks/use-pagination";
import { useNavigate, useParams } from "react-router";

import { TbFileTypePdf } from "react-icons/tb";
import { RiFileExcel2Line } from "react-icons/ri";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { handleExport, pdfExport } from "./export";
import { ThreeDots } from "../../utils/loading/dots";

export const EmployeesSalaryPage = () => {
  // Calling  hooks and  Getting necessary information
  const dispatcher = useAppDispatch();
  const salary = useAppSelector((state) => state.salary);
  const [searchBy, _] = useState("first_name");
  const { pagination, setPagination } = usePagination();
  const [allowanceTypes, setAllowanceTypes] = useState<string[]>([]);
  const [deductionTypes, setDeductionTypes] = useState<string[]>([]);
  const { employees } = useAppSelector((state) => state.salary);
  const [search_val, setSearchVal] = useState<string>("");
  const navigate = useNavigate();

  const {
    year: query_year,
    month: query_month,
    changeMonth,
    changeYear,
  } = useYearMonthPagination();
  const { year, month } = useParams();
  useEffect(() => {
    if (year && month) {
      dispatcher(
        loadNextPaymentListPage(`employee/salary/get/${year}/${month}`)
      );
    } else {
      dispatcher(
        loadNextPaymentListPage(
          `employee/salary/get/${current_year}/${current_month}`
        )
      );
    }
  }, [year, month]);

  // Implementing year-month pagination
  const now = new Date(Date.now());
  const start_year = 2022;
  const current_year = now.getFullYear();

  const years = Array.from(
    { length: current_year - start_year + 1 },
    (_, index) => start_year + index
  );

  const start_month = 1;
  const current_month = now.getMonth() + 1;
  const months = Array.from(
    { length: current_month - start_month + 1 },
    (_, index) => start_month + index
  );

  // Defining use effect to navigate if there is a change
  useEffect(() => {
    if (!query_month && !query_year) return;
    !query_year && changeYear(current_year);
    !query_month && changeMonth(current_month);
    query_year &&
      query_month &&
      navigate(`/employees-salary/${query_year}/${query_month}`);
  }, [query_year, query_month]);

  useEffect(() => {
    salary.pagination && setPagination(salary.pagination);
  }, [salary.pagination]);
  useEffect(() => {
    const loadEmployee = setTimeout(() => {
      dispatcher(
        searchPaymentRequested({
          search_by: searchBy,
          search_value: search_val,
        })
      );
    }, 500);

    return () => clearTimeout(loadEmployee);
  }, [search_val]);

  useEffect(() => {
    setAllowanceTypes(Array.from(getAllowancesTypes(employees)));
    setDeductionTypes(Array.from(getDeductionTypes(employees)));
  }, [employees]);

  const [employeeSalary, setEmployeeSalary] = useState<PaymentEmployee[]>([]);

  useEffect(() => {
    if (salary.searching && salary.search_response)
      setEmployeeSalary(salary.search_response || []);
    else setEmployeeSalary(salary.employees || []);
  }, [salary.employees, salary.search_response]);

  return (
    <SalaryContainer>
      <EmpsDisplayerHeader>
        <Title>Employees Payroll</Title>
      </EmpsDisplayerHeader>

      <EmpsDisplayerHeader>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            onChange={(e) => {
              setSearchVal(e.currentTarget.value);
            }}
          />
        </SearchContainer>

        <ExportButton
          onClick={() => {
            handleExport(employeeSalary, allowanceTypes, deductionTypes);
          }}
        >
          <ExportIcon>
            <RiFileExcel2Line />
          </ExportIcon>
          Excel
        </ExportButton>
        <ExportButton onClick={pdfExport}>
          <ExportIcon>
            <TbFileTypePdf />
          </ExportIcon>
          PDF
        </ExportButton>
        <StartPaymentBtn>Rise Salary</StartPaymentBtn>

        <Label
          style={{
            position: "absolute",
            right: "1rem",
            top: "0rem",
            fontSize: "1.5rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Select
            value={`${query_year || current_year}`}
            onChange={(e) => {
              changeYear(+e.target.value);
            }}
          >
            {years.map((year) => (
              <SelectOption key={year} value={`${year}`}>
                {year}
              </SelectOption>
            ))}
          </Select>
          <Select
            value={`${query_month || current_month}`}
            onChange={(e) => {
              changeMonth(+e.target.value);
            }}
          >
            {months.map(
              (month) =>
                ((query_year && query_year < current_year) ||
                  month <= new Date(Date.now()).getMonth() + 1) && (
                  <SelectOption key={month} value={`${month}`}>
                    {getNamedMonth(new Date(`${year}-${month}-01`))}
                  </SelectOption>
                )
            )}
          </Select>
        </Label>
      </EmpsDisplayerHeader>
      {salary.loading ? (
        <ThreeDots size={1} />
      ) : (
        <SalaryTable id="table">
          <thead>
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
              <HeaderTitle rowSpan={2}>Month</HeaderTitle>
              <HeaderTitle rowSpan={2}>Payment</HeaderTitle>
              <HeaderTitle rowSpan={2}> Payment Date</HeaderTitle>
            </TableHeader>
            <TableHeader>
              {allowanceTypes.map((allowanceType) => {
                return (
                  <HeaderTitle key={allowanceType}>{allowanceType}</HeaderTitle>
                );
              })}
              <HeaderTitle>Income Tax</HeaderTitle>
              {deductionTypes.map((deductionType) => {
                return (
                  <HeaderTitle key={deductionType}>{deductionType}</HeaderTitle>
                );
              })}
            </TableHeader>
          </thead>
          <tbody>
            {employeeSalary
              .filter((employee) => employee)
              .map((employee) => (
                <TableRow key={employee.employee_id}>
                  <TableData>{employee.employee_id}</TableData>
                  <TableData>{employee.employee_name}</TableData>
                  <TableData>{employee.basic_salary}</TableData>
                  {allowanceTypes.map((allowanceType) => {
                    return (
                      <TableData key={allowanceType}>
                        {getRate(
                          employee.allowances.find(
                            (alowance) =>
                              alowance.allowance_type === allowanceType
                          )?.allowance_rate
                        )}
                      </TableData>
                    );
                  })}
                  <TableData>{getSalary(employee.gross_salary)}</TableData>
                  <TableData>{getSalary(employee.income_tax)}</TableData>
                  {deductionTypes.map((deductionType) => {
                    return (
                      <TableData key={deductionType}>
                        {getRate(
                          employee.deductions.find(
                            (deduction) =>
                              deduction.deduction_type === deductionType
                          )?.deduction_rate
                        )}
                      </TableData>
                    );
                  })}
                  <TableData>{employee.total_deduction}</TableData>
                  <TableData>{employee.net_salary}</TableData>
                  <TableData>
                    {getFormattedMonth(new Date(employee.month)).split("-")[0]}
                  </TableData>
                  <TableData>
                    {!employee.payment_status && "Not"} Paid{" "}
                  </TableData>
                  <TableData> {employee.payment_date} </TableData>
                </TableRow>
              ))}
          </tbody>
        </SalaryTable>
      )}
      <Pagination pagination={pagination} />
    </SalaryContainer>
  );
};
