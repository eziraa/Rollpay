import { BaseResponse, Pagination } from "../utils/response";
import { EditDeductionParams } from "./params";

export interface Deduction extends EditDeductionParams {
  date_of_start: string | undefined;
  date_of_end: string | undefined;
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
