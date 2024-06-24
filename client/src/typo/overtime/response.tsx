import { CustomResponse, Pagination } from "../utils/response";
import { EditOvertimeParams } from "./params";

export interface Overtime extends EditOvertimeParams {}

export interface AddOvertimeResponse extends CustomResponse {
  allowance: Overtime;
}
export interface EditOvertimeResponse extends AddOvertimeResponse {}
export interface DeleteOvertimeResponse extends AddOvertimeResponse {}
export interface PaginatedOvertimeResponse extends CustomResponse {
  count: number;
  results: Overtime[];
  pagination: Pagination;
}
