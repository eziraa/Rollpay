import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PaymentEmployee } from "../../../typo/payment/response";
import { getFormattedMonth } from "./utils";

export const handleExport = (
  employeeSalary: PaymentEmployee[],
  allowanceTypes: string[],
  deductionTypes: string[]
) => {
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

export const pdfExport = () => {
  const pdf = new jsPDF("landscape");
  autoTable(pdf, {
    html: "table",
    styles: {
      fontSize: 8,
    },
  });
  pdf.save("Employee payroll.pdf");
};
