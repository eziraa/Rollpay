import { BaseResponse, Pagination } from "../utils/response";
import { EditOvertimeParams } from "./params";

export interface Overtime extends EditOvertimeParams {}

export interface AddOvertimeResponse extends BaseResponse {
  overtime: Overtime;
}
export interface EditOvertimeResponse extends AddOvertimeResponse {}
export interface DeleteOvertimeResponse extends AddOvertimeResponse {}
export interface PaginatedOvertimeResponse extends BaseResponse {
  count: number;
  results: Overtime[];
  pagination: Pagination;
}
