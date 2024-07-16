import { PaymentEmployee } from "../../../typo/payment/response";

export const getFormattedMonth = (date: Date): string => {
  return (
    date.toLocaleString("en-US", {
      month: "long", // Display the full month name
    }) + ` - ${date.getFullYear()}`
  );
};

export const getNamedMonth = (date: Date): string => {
  return date.toLocaleString("en-US", {
    month: "long", // Display the full month name
  });
};
export const getSalary = (salary: number | null) => {
  if (salary) {
    return (salary * 1.0).toFixed(2);
  }
  return "-";
};

export const getRate = (rate: number | undefined) => {
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

export const getAllowancesTypes = (employees: PaymentEmployee[]) => {
  const tempAllowanceTypes = new Set<string>();

  employees.forEach((employee) => {
    employee.allowances.forEach((allowance) => {
      tempAllowanceTypes.add(allowance.allowance_type);
    }); // }
  });
  return tempAllowanceTypes;
};

export const getDeductionTypes = (employees: PaymentEmployee[]) => {
  const tempDeductionTypes = new Set<string>();

  employees.forEach((employee) => {
    employee.deductions.forEach((deduction) => {
      tempDeductionTypes.add(deduction.deduction_type);
    });
  });

  return tempDeductionTypes;
};


export const getOvertimeTypes = (employees: PaymentEmployee[]) => {
  const tempOvertimeTypes = new Set<string>();

  employees.forEach((employee) => {
    employee.overtimes.forEach((overtime) => {
      tempOvertimeTypes.add(overtime.overtime_type);
    });
  });
  return tempOvertimeTypes;
};
