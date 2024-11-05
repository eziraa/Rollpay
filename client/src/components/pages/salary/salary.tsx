/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";

import {
  SalaryContainer,
  SearchContainer,
  SearchInput,
  Button,
  ExportIcon,
  TableContainer,
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
import { Outlet, useNavigate, useParams } from "react-router";

import { TbFileTypePdf } from "react-icons/tb";
import { RiFileExcel2Line } from "react-icons/ri";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { handleExport, pdfExport } from "./export";
import { ThreeDots } from "../../utils/loading/dots";
import SalaryAPI from "../../../services/salary-api";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { PaginatedPaymentResponse } from "../../../typo/salary/response";
import Pagination from "../../sections/pagination/pagination";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { Table } from "./table";
const getNestValue = (key: string, type: string, employee: PaymentEmployee) => {
  if (key === "overtimes") {
    const res: string | undefined = employee.overtimes.find(
      (overtime) => overtime.overtime_type === type
    )?.overtime_rate;
    return res ? res : "-";
  }

  if (key === "allowances") {
    const res: number | undefined = employee.allowances.find(
      (allowance) => allowance.allowance_type === type
    )?.allowance_rate;
    return res ? res + "%" : "-";
  }
  if (key === "deductions") {
    const res: number | undefined = employee.deductions.find(
      (deduction) => deduction.deduction_type === type
    )?.deduction_rate;
    return res ? res + "%" : "-";
  }
};

export interface ColumnInterface {
  key: string;
  value: string;
  sub_columns?: ColumnInterface[];
}

const clalculateLength = (clumns: ColumnInterface[]): string[] => {
  const lengths: string[] = [];
  clumns.forEach((column) => {
    if (column.sub_columns) {
      lengths.push(...clalculateLength(column.sub_columns));
    } else if (column.key === "month") {
      lengths.push("10fr");
    } else if (column.key === "employee_name") {
      lengths.push("15fr");
    } else {
      lengths.push(column.value.length + "fr");
    }
  });
  return lengths;
};
export const EmployeesSalaryPage = () => {
  // Calling  hooks and  Getting necessary information
  const dispatcher = useAppDispatch();
  const salary = useAppSelector((state) => state.salary);
  const [searchBy, _] = useState("first_name");
  const [paying, setPaying] = useState(false);
  const [allowanceTypes, setAllowanceTypes] = useState<string[]>([]);
  const [deductionTypes, setDeductionTypes] = useState<string[]>([]);
  const { employees } = useAppSelector((state) => state.salary);
  const [search_val, setSearchVal] = useState<string>("");
  const [table_col, setColumns] = useState<ColumnInterface[]>([]);
  const navigate = useNavigate();

  const { year, month, changeMonth, changeYear } = useYearMonthPagination();
  const { year: query_year, month: query_month } = useParams();
  const handlePay = (month: string, employee_id = "") => {
    setPaying(true);
    SalaryAPI.paySalary(month, employee_id)
      .then((response: PaginatedPaymentResponse) => {
        dispatcher(
          setFlashMessage({
            type: "success",
            title: "Pay salary",
            status: true,
            duration: 5,
            desc: "Salary paid successfully",
          })
        );
        if (response.results.length > 0) {
          dispatcher(getSalariesDone(response));
        }
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
      })
      .finally(() => {
        setPaying(false);
      });
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
    let column: ColumnInterface[] = [];
    setAllowanceTypes(Array.from(getAllowancesTypes(employees)));
    setDeductionTypes(Array.from(getDeductionTypes(employees)));
    if (employees.length > 0)
      column = Object.entries(employees[0])
        .filter(([key]) => key !== "salary_history" && key !== "position_history")
        .map(([key, value]) => {
          if (key.includes("_")) {
            return {
              key: key,
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
                .map((item) => item[0]?.toUpperCase() + item.slice(1))
                .join(" "),
              sub_columns: Array.from(getOvertimeTypes(employees)).map(
                (key) => {
                  return {
                    key: key
                      .split(" ")
                      .map((item) => item[0]?.toLowerCase() + item.slice(1))
                      .join(" "),
                    value: key
                      .split("_")
                      .map((item) => item[0]?.toUpperCase() + item.slice(1))
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
    column && setColumns(column);
  }, [employees]);

  const [employeeSalary, setEmployeeSalary] = useState<PaymentEmployee[]>([]);
  if (!salary.loading) {
    clalculateLength(table_col);
  }
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
          <SearchIcon color={addOpacityToColor(0.75, "#36fb88")} />
          <SearchInput
            onChange={(e) => {
              setSearchVal(e.currentTarget.value);
            }}
          />
        </SearchContainer>

        <Button
          onClick={() => {
            handleExport(employeeSalary, allowanceTypes, deductionTypes);
          }}
        >
          <ExportIcon>
            <RiFileExcel2Line />
          </ExportIcon>
          Excel
        </Button>
        <Button onClick={pdfExport}>
          <ExportIcon>
            <TbFileTypePdf />
          </ExportIcon>
          PDF
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate("raise");
          }}
        >
          Raise
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            if (employees.length > 0) handlePay(employees[0].month);
          }}
        >
          Pay
        </Button>

        <Label>
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
      {salary.loading || table_col.length < 5 ? (
        <ThreeDots size={1} />
      ) : (
        <TableContainer>
          <Table
            style={{
              zIndex: 5000,
            }}
            gridCols={clalculateLength(table_col).join(" ") + " 8fr"}
            className="shadow-lg "
            id="table"
          >
            <thead id="table" className="shadow-lg">
              <tr>
                {table_col.length > 0 &&
                  table_col.map((column) => {
                    if (!column.sub_columns) {
                      return (
                        <th
                          style={{
                            gridRowEnd: "span 2",
                          }}
                        >
                          {column.value}
                        </th>
                      );
                    } else {
                      return (
                        <th
                          style={{
                            textAlign: "center",
                            gridColumnEnd: `span ${column.sub_columns.length}`,
                          }}
                        >
                          <span>{column.value}</span>
                        </th>
                      );
                    }
                  })}
                <th
                  style={{
                    gridRowEnd: "span 2",
                  }}
                >
                  Actions
                </th>
                {table_col.length > 0 &&
                  table_col.map((column) => {
                    if (column.sub_columns) {
                      return column.sub_columns.map((sub_column) => (
                        <th>
                          <span>{sub_column.value}</span>
                        </th>
                      ));
                    }
                  })}
              </tr>
            </thead>
            <tbody>
              {employeeSalary
                .filter((employee) => employee)
                .map((employee) => (
                  <tr key={employee.employee_id}>
                    {table_col.length > 0 &&
                      table_col.map((column) => {
                        if (!column.sub_columns) {
                          const value =
                            employee[column.key as keyof PaymentEmployee];
                          if (typeof value !== "boolean" && !!value) {
                            return <td>{value?.toString()}</td>;
                          }
                          return (
                            <td className="text-center ">
                              {value ? (
                                <span className="success w-full text-center ">
                                  paid
                                </span>
                              ) : (
                                <span className="warning w-full text-center">
                                  not paid
                                </span>
                              )}
                            </td>
                          );
                        } else {
                          return column.sub_columns?.map((value) => (
                            <td className="center-text">
                              <span className="center-text">
                                {getNestValue(
                                  column.key,
                                  value.value,
                                  employee
                                )}
                              </span>
                            </td>
                          ));
                        }
                      })}
                    <td>
                      <button
                        disabled={paying}
                        className={
                          (paying
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                            : "") +
                          " w-full capitalize bg-slate-300 rounded-md py-1 hove:bg-slate-400  "
                        }
                        onClick={() => {
                          handlePay(employee.month, employee.employee_id);
                        }}
                      >
                        {employee.payment_date ? "reset" : "pay"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Outlet />
      {salary.pagination && <Pagination pagination={salary.pagination} />}
    </SalaryContainer>
  );
};
