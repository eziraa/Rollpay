import { BaseResponse } from "../utils/response";

export interface AllowanceResponse {
  id: number;
  allowance_type: string;
  amount: number;
}

export interface DeductionResponse {
  deduction_type: string;
  amount: number;
}
export interface OvertimeResponse {
  overtime_type: string;
  amount: number;
}
export interface StatisticsResponse {
  total_employees: number;
  total_positions: number;
  curr_month_tax: number;
  curr_month_allowances: number;
  curr_month_deductions: number;
  curr_month_overtimes: number;
  curr_month_payment_amount: number;
  avg_basic_salary: number;
  curr_month_allowance: AllowanceResponse[];
  curr_month_deduction: DeductionResponse[];
  curr_month_overtime: OvertimeResponse[];
}

export interface StatResponse extends BaseResponse {
  stat: StatisticsResponse;
}

export interface PaymentStatisticeResponse {
  total_amount_of_payment: number;
  total_overtimes_payment: number;
  total_allowances_payment: number;
  total_deductions_payment: number;
  month: string;
  payment_date: string;
}