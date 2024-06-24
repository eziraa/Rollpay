import { CustomResponse } from "../utils/response";
import { EditAllowanceParams } from "./params";

export interface Allowance extends EditAllowanceParams {}

export interface AddAllowanceResponse extends CustomResponse {
  allowance: Allowance;
}
export interface EditAllowanceResponse extends AddAllowanceResponse {}
export interface DeleteAllowanceResponse extends AddAllowanceResponse {}
