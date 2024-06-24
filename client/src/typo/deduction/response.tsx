import { CustomResponse, Pagination } from "../utils/response";
import { EditDeductionParams } from "./params";

export interface Deduction extends EditDeductionParams {}

export interface AddDeductionResponse extends CustomResponse {
  allowance: Deduction;
}
export interface EditDeductionResponse extends AddDeductionResponse {}
export interface DeleteDeductionResponse extends AddDeductionResponse {}
export interface PaginatedDeductionResponse extends CustomResponse {
  count: number;
  results: Deduction[];
  pagination: Pagination;
}
