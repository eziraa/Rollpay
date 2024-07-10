import { BaseResponse, Pagination } from "../utils/response";
import { EditAllowanceParams } from "./params";

export interface Allowance extends EditAllowanceParams {
  start_at: string | undefined;
  end_at: string | undefined;
}

export interface AddAllowanceResponse extends BaseResponse {
  allowance: Allowance;
}
export interface EditAllowanceResponse extends AddAllowanceResponse {}
export interface DeleteAllowanceResponse extends AddAllowanceResponse {}
export interface PaginatedAllowanceResponse extends BaseResponse {
  count: number;
  results: Allowance[];
  pagination: Pagination;
}
