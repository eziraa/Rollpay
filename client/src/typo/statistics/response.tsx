import { BaseResponse } from "../utils/response";

export interface StatisticsResponse {
  total_employees: string;
  curr_month_tax: string;
  curr_month_allowances: string;
  curr_month_deductions: string;
  curr_month_payment_amount: string;
}

export interface StatResponse extends BaseResponse {
  stat: StatisticsResponse;
}
