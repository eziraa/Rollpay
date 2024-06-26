import { Allowance, Deduction, Overtime } from "../salary/response";

export interface Payment {
  basic_salary: number;
  gross_salary: number;
  allowances: Allowance[];
  overtimes: Overtime[];
  deductions: Deduction[];
  net_salary: number;
  total_deduction: number;
  income_tax: number;
  payment_date: string;
  payment_status: boolean;
  month: string;
}

export interface PaymentEmployee extends Payment {
  employee_id: string;
  employee_name: string;
}
export interface PaymentResponse {
  error: string;
  code: number;
  success: string;
}

export interface CurrEmpPayments {
  employee_id: string;
  employee_name: string;
  payments: Payment[];
}