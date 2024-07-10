import { BaseResponse, Pagination } from "../utils/response";
import { EditDeductionParams } from "./params";

export interface Deduction extends EditDeductionParams {
  start_at: string | undefined;
  end_at: string | undefined;
}

export interface AddDeductionResponse extends BaseResponse {
  deduction: Deduction;
}
export interface EditDeductionResponse extends AddDeductionResponse {}
export interface DeleteDeductionResponse extends AddDeductionResponse {}
export interface PaginatedDeductionResponse extends BaseResponse {
  count: number;
  results: Deduction[];
  pagination: Pagination;
}
