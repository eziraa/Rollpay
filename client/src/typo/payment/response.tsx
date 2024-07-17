import { Employee } from "../employee/response";
import { Allowance, Deduction, Overtime } from "../salary/response";
export interface SalaryHistory {
  salary: number;
  from: string;
  to: string;
}

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
  salary_history: SalaryHistory[];
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

export interface CurrEmpPayments extends Employee {
  payments: Payment[];
}
