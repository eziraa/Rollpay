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
  getSalariesRequested,
  loadNextPaymentListPage,
  searchPaymentRequested,
} from "../../../store/salary/salary-slice";
import Pagination from "../../sections/pagination/pagination";
import LoadingSpinner from "../../utils/spinner/spinner";
import { getFormattedMonth, getNamedMonth } from "./utils";
import { Label } from "../../sections/profile/profile.style";
import { PaymentEmployee } from "../../../typo/payment/response";
import * as XLSX from "xlsx";
import { usePagination } from "../../../hooks/use-pagination";
import { useNavigate, useParams } from "react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { TbFileTypePdf } from "react-icons/tb";
import { RiFileExcel2Line } from "react-icons/ri";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";

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

  const {
    year: curr_year,
    month: curr_month,
    changeMonth,
    changeYear,
  } = useYearMonthPagination();
  const navigate = useNavigate();
  const { year, month } = useParams();
  useEffect(() => {
    if (year && month) {
      dispatcher(
        loadNextPaymentListPage(`employee/salary/get/${year}/${month}`)
      );
    } else dispatcher(getSalariesRequested());
  }, [year, month]);
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
    const tempAllowanceTypes = new Set<string>();
    const tempDeductionTypes = new Set<string>();
    employees.forEach((employee) => {
      employee.allowances.forEach((allowance) => {
        tempAllowanceTypes.add(allowance.allowance_type);
      });
      employee.deductions.forEach((deduction) => {
        tempDeductionTypes.add(deduction.deduction_type);
      });
      // }
    });

    setAllowanceTypes(Array.from(tempAllowanceTypes));
    setDeductionTypes(Array.from(tempDeductionTypes));
  }, [employees]);
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

  const [employeeSalary, setEmployeeSalary] = useState<PaymentEmployee[]>([]);
  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const emplist = employeeSalary.map((employee) => {
      let local_employee = {
        ["Employee Id"]: employee.employee_id,
        ["Employee Name"]: employee.employee_name,
        ["Salary"]: employee.basic_salary,
      };
      allowanceTypes.forEach((type) => {
        local_employee = {
          ...local_employee,
          [type]: employee.allowances.find(
            (allowance) => allowance.allowance_type === type
          )?.allowance_rate,
        };
      });
      deductionTypes.forEach((type) => {
        local_employee = {
          ...local_employee,
          [type]: employee.deductions.find(
            (deduction) => deduction.deduction_type === type
          )?.deduction_rate,
        };
      });

      local_employee = {
        ...local_employee,
        ["Gross Salary" as string]: employee.gross_salary,
        ["Income Tax" as string]: employee.income_tax,
        ["Total Deduction" as string]: employee.total_deduction,
        ["Net Salary" as string]: employee.net_salary,
        ["Month" as string]: getFormattedMonth(new Date(employee.month)).split(
          "-"
        )[0],
        ["Payment Date" as string]: employee.payment_date,
        ["Payment Status" as string]: employee.payment_status,
      };
      return {
        ...local_employee,
      };
    });
    const ws = XLSX.utils.json_to_sheet(emplist);

    XLSX.utils.book_append_sheet(wb, ws, "SalarySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const pdfExport = () => {
    const pdf = new jsPDF("landscape");
    autoTable(pdf, {
      html: "table",
      styles: {
        fontSize: 8,
      },
    });
    pdf.save("Employee payroll.pdf");
  };

  useEffect(() => {
    if (salary.searching && salary.search_response)
      setEmployeeSalary(salary.search_response || []);
    else setEmployeeSalary(salary.employees || []);
  }, [salary.employees, salary.search_response]);

  // Implementing year-month pagination
  const start_year = 2022;
  const end_year = 2024;
  const years = Array.from(
    { length: end_year - start_year + 1 },
    (_, index) => start_year + index
  );

  const start_month = 1;
  const end_month = 12;
  const months = Array.from(
    { length: end_month - start_month + 1 },
    (_, index) => start_month + index
  );

  // Defining use effect to navigate if there is a change
  useEffect(() => {
    if (!curr_month && !curr_year) return;

    !curr_year && changeYear(start_year);
    !curr_month && changeMonth(start_month);
    curr_year &&
      curr_month &&
      navigate(`/employees-salary/${curr_year}/${curr_month}`);
  }, [curr_year, curr_month]);

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

        <ExportButton onClick={handleExport}>
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
            value={`${curr_year}`}
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
            value={`${curr_month}`}
            onChange={(e) => {
              changeMonth(+e.target.value);
            }}
          >
            {months.map(
              (month) =>
                ((curr_year && curr_year < end_year) ||
                  month <= new Date(Date.now()).getMonth()) && (
                  <SelectOption key={month} value={`${month}`}>
                    {getNamedMonth(new Date(`${year}-${month}-01`))}
                  </SelectOption>
                )
            )}
          </Select>
        </Label>
      </EmpsDisplayerHeader>
      {!salary.task_finished ? (
        <LoadingSpinner />
      ) : (
        <SalaryTable id="table">
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
              return <HeaderTitle> {allowanceType} </HeaderTitle>;
            })}
            <HeaderTitle>Income Tax</HeaderTitle>
            {deductionTypes.map((deductionType) => {
              return <HeaderTitle> {deductionType} </HeaderTitle>;
            })}
          </TableHeader>
          {employeeSalary
            .filter((employee) => employee)
            .map((employee) => (
              <TableRow key={employee.employee_id}>
                <TableData>{employee.employee_id}</TableData>
                <TableData>{employee.employee_name}</TableData>
                <TableData>{employee.basic_salary}</TableData>
                {allowanceTypes.map((allowanceType) => {
                  return (
                    <TableData>
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
                    <TableData>
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
                <TableData>{!employee.payment_status && "Not"} Paid </TableData>
                <TableData> {employee.payment_date} </TableData>
              </TableRow>
            ))}
        </SalaryTable>
      )}
      <Pagination pagination={pagination} />
    </SalaryContainer>
  );
};
