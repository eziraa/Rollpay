import { CurrEmpPayments, PaymentEmployee } from "../payment/response";
import { PaginatedBackEndResponse, PaginatedResponse } from "../utils/response";

export interface Allowance {
  allowance_type: string;
  allowance_rate: number;
}

export interface Deduction {
  deduction_type: string;
  deduction_rate: number;
}

export interface Overtime {
  overtime_type: string;
  overtime_rate: number;
  length: number;
}

export interface Salary {
  id: string;
  basic_salary: number;
  gross_salary: number | null;
  allowances: Allowance[];
  overtimes: Overtime[];
  deductions: Deduction[];
  net_salary: number | null;
  total_deduction: number | null;
  income_tax: number | null;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  position: string;
  phone_number: string;
  date_of_birth: string;
  date_of_hire: string;
  salary: Salary;
}
export interface SalaryEmpResponse {
  employees: PaymentEmployee[];
  error: string | undefined;
  code: number | undefined;
  success: string | undefined;
}

export interface CurrentEmpPaymentsResponse {
  employee: CurrEmpPayments;
  error: string | undefined;
  code: number | undefined;
  scuccess: string | undefined;
}

export interface PaginatedPaymentResponse extends PaginatedResponse {
  results: PaymentEmployee[];
}

export interface PaginatedPayBackEndResponse extends PaginatedBackEndResponse {
  results: PaymentEmployee[];
}
