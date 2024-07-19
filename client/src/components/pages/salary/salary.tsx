/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";

import {
  SalaryContainer,
  SalaryTable,
  SearchContainer,
  SearchInput,
  ExportButton,
  ExportIcon,
  StartPaymentBtn,
  TableContainer,
  TableHeader,
  HeaderTitle,
  Vertical,
  TableRow,
  TableData,
  // ExportLabel,
} from "./salary.style";
import { SearchIcon } from "../../utils/search/search.style";
import {
  EmpsDisplayerHeader,
  Title,
} from "../display-employee/display-employee.style";
import { Select, SelectOption } from "../../utils/form-elements/form.style";
import {
  getSalariesDone,
  loadNextPaymentListPage,
  searchPaymentRequested,
} from "../../../store/salary/salary-slice";
import {
  getAllowancesTypes,
  getDeductionTypes,
  getNamedMonth,
  getOvertimeTypes,
} from "./utils";
import { Label } from "../../sections/profile/profile.style";
import { PaymentEmployee } from "../../../typo/payment/response";
import { usePagination } from "../../../hooks/use-pagination";
import { Outlet, useNavigate, useParams } from "react-router";

import { TbFileTypePdf } from "react-icons/tb";
import { RiFileExcel2Line } from "react-icons/ri";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { handleExport, pdfExport } from "./export";
import { ThreeDots } from "../../utils/loading/dots";
import SalaryAPI from "../../../services/salary-api";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import {
  PaginatedPaymentResponse,
} from "../../../typo/salary/response";
import Pagination from "../../sections/pagination/pagination";

const getNestValue = (
  key: string,
  value: string,
  employee: PaymentEmployee
) => {
  if (key === "overtimes") {
    const res: string | undefined = employee.overtimes.find(
      (overtime) => overtime.overtime_type === value
    )?.overtime_rate;
    return res ? res : "-";
  }

  if (key === "allowances") {
    const res: number | undefined = employee.allowances.find(
      (allowance) => allowance.allowance_type === value
    )?.allowance_rate;
    return res ? res + "%" : "-";
  }
  if (key === "deductions") {
    const res: number | undefined = employee.deductions.find(
      (deduction) => deduction.deduction_type === value
    )?.deduction_rate;
    return res ? res + "%" : "-";
  }
};

export interface ColumnInterface {
  key: string;
  value: string;
  sub_columns?: ColumnInterface[];
}
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
  const [table_col, setColumns] = useState<ColumnInterface[]>([]);
  const navigate = useNavigate();

  const { year, month, changeMonth, changeYear } = useYearMonthPagination();
  const { year: query_year, month: query_month } = useParams();
  const handlePay = (month: string) => {
    const response: PaginatedPaymentResponse = SalaryAPI.paySalary(month)
      .then(() => {
        dispatcher(
          setFlashMessage({
            type: "success",
            title: "Pay salary",
            status: true,
            duration: 5,
            desc: "Salary paid successfully",
          })
        );
      })
      .catch(() => {
        dispatcher(
          setFlashMessage({
            type: "error",
            title: "Failed to pay salary",
            status: true,
            duration: 5,
            desc: "Please try again later",
          })
        );
      });
    if (response.results.length > 0) {
      dispatcher(getSalariesDone(response));
      window.location.reload();
    }
  };
  useEffect(() => {
    if (query_year && query_month) {
      dispatcher(
        loadNextPaymentListPage(
          `employee/salary/get/${query_year}/${query_month}`
        )
      );
    } else {
      dispatcher(
        loadNextPaymentListPage(
          `employee/salary/get/${current_year}/${current_month}`
        )
      );
    }
  }, [query_year, query_month]);

  // Implementing year-month pagination
  const now = new Date(Date.now());
  const start_year = 2022;
  const current_year = now.getFullYear();

  const years = Array.from(
    { length: current_year - start_year + 1 },
    (_, index) => start_year + index
  );

  const current_month = now.getMonth() + 1;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Defining use effect to navigate if there is a change
  useEffect(() => {
    if (!month && !year) return;
    !year && changeYear(current_year);
    !month && changeMonth(current_month);
    year && month && navigate(`/payroll/${year}/${month}`);
  }, [month, year]);

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
    let column: ColumnInterface[] = [];
    if (employees.length > 0)
      column = Object.entries(employees[0])
        .filter(([key]) => key !== "salary_history")
        .map(([key, value]) => {
          if (key === "payment_date") {
            return {
              key: "payment_date",
              value: key
                .split("_")
                .map((item) => item[0].toUpperCase() + item.slice(1))
                .join(" "),
            };
          }
          if (key === "overtimes") {
            return {
              key: key,
              value: key
                .split("_")
                .map((item) => item[0].toUpperCase() + item.slice(1))
                .join(" "),
              sub_columns: Array.from(getOvertimeTypes(employees)).map(
                (key) => {
                  return {
                    key: key
                      .split(" ")
                      .map((item) => item[0].toLowerCase() + item.slice(1))
                      .join(" "),
                    value: key
                      .split("_")
                      .map((item) => item[0].toUpperCase() + item.slice(1))
                      .join(" "),
                  };
                }
              ),
            };
          } else if (key === "deductions") {
            return {
              key: key,
              value: key
                .split("_")
                .map((item) => item[0].toUpperCase() + item.slice(1))
                .join(" "),
              sub_columns: Array.from(getDeductionTypes(employees)).map(
                (key) => {
                  return {
                    key: key
                      .split(" ")
                      .map((item) => item[0].toLowerCase() + item.slice(1))
                      .join("_"),
                    value: key
                      .split("_")
                      .map((item) => item[0].toUpperCase() + item.slice(1))
                      .join(" "),
                  };
                }
              ),
            };
          } else if (key === "allowances") {
            return {
              key: key,
              value: key
                .split("_")
                .map((item) => item[0].toUpperCase() + item.slice(1))
                .join("_"),
              sub_columns: Array.from(getAllowancesTypes(employees)).map(
                (key) => {
                  return {
                    key: key
                      .split(" ")
                      .map((item) => item[0].toLowerCase() + item.slice(1))
                      .join("_"),
                    value: key
                      .split("_")
                      .map((item) => item[0].toUpperCase() + item.slice(1))
                      .join(" "),
                  };
                }
              ),
            };
          }
          if (["string", "number", "boolean"].includes(typeof value)) {
            return {
              key: key,
              value: key
                .split("_")
                .map((item) => item[0].toUpperCase() + item.slice(1))
                .join(" "),
            };
          }
          return {
            key: "",
            value: "",
          };
        });

    console.log(column);
    column && setColumns(column);
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
        <StartPaymentBtn
          onClick={(e) => {
            e.stopPropagation();
            navigate("raise");
          }}
        >
          Raise
        </StartPaymentBtn>
        <StartPaymentBtn
          onClick={(e) => {
            e.stopPropagation();
            if (employees.length > 0) handlePay(employees[0].month);
          }}
        >
          Pay
        </StartPaymentBtn>

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
            {months
              .filter(
                (month) =>
                  (year && year < current_year) || month <= current_month
              )
              .map((month) => (
                <SelectOption key={month} value={`${month}`}>
                  {getNamedMonth(new Date(`${year}-${month}-01`))}
                </SelectOption>
              ))}
          </Select>
        </Label>
      </EmpsDisplayerHeader>
      {salary.loading ? (
        <ThreeDots size={1} />
      ) : (
        <TableContainer>
          <SalaryTable id="table">
            <TableHeader
              style={{
                width: "150rem",
              }}
            >
              {table_col.length > 0 &&
                table_col.map((column) => {
                  if (!column.sub_columns) {
                    return (
                      <HeaderTitle
                        style={{
                          flex:
                            column.key === "month"
                              ? column.key.length * 2
                              : `${column.key.length}`,
                        }}
                      >
                        {column.value}
                      </HeaderTitle>
                    );
                  } else {
                    return (
                      <Vertical>
                        <HeaderTitle
                          style={{
                            flex: column.sub_columns.reduce(
                              (acc, column) => acc + column.value.length,
                              0
                            ),
                          }}
                        >
                          {" "}
                          {column.value}{" "}
                        </HeaderTitle>
                        {
                          <TableHeader>
                            {column.sub_columns?.map((value) => (
                              <HeaderTitle
                                style={{
                                  flex: value.key ? `${value.key.length}` : "7",
                                }}
                              >
                                {value.value}
                              </HeaderTitle>
                            ))}
                          </TableHeader>
                        }
                      </Vertical>
                    );
                  }
                })}
            </TableHeader>
            {employeeSalary
              .filter((employee) => employee)
              .map((employee) => (
                <TableRow key={employee.employee_id}>
                  {table_col.length > 0 &&
                    table_col.map((column) => {
                      if (!column.sub_columns) {
                        return (
                          <TableData
                            style={{
                              flex:
                                column.key === "month"
                                  ? column.key.length * 2
                                  : `${column.key.length}`,
                            }}
                          >
                            {employee[column.key]}
                          </TableData>
                        );
                      } else {
                        return column.sub_columns?.map((value) => (
                          <TableData
                            style={{
                              flex: value.key ? `${value.key.length}` : "7",
                            }}
                            className="center-text"
                          >
                            <span className="center-text">
                              {getNestValue(column.key, value.value, employee)}
                            </span>
                          </TableData>
                        ));
                      }
                    })}
                </TableRow>
              ))}
          </SalaryTable>
        </TableContainer>
      )}
      <Outlet />
      <Pagination pagination={pagination} />
    </SalaryContainer>
  );
};
