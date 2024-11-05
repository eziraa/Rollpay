import { Employee } from "../employee/response";
import { Allowance, Deduction, Overtime } from "../salary/response";
export interface SalaryHistory {
  salary: number;
  start_date: string;
  end_date: string;
  reason: string;
}

export interface PositionHistory {
  position_name: number;
  start_date: string;
  end_date: string;
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
  position_history: PositionHistory[];
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
