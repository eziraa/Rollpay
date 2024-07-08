import { BaseResponse } from "../utils/response";

export interface StatisticsResponse {
  total_employees: number;
  curr_month_tax: number;
  curr_month_allowances: number;
  curr_month_deductions: number;
  curr_month_payment_amount: number;
}

export interface StatResponse extends BaseResponse {
  stat: StatisticsResponse;
}
