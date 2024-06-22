import { Payment } from "../payment/response";
import { SalaryEmpResponse } from "./response";

export interface BillEmpState {
  loading: boolean;
  response: SalaryEmpResponse | undefined;
  searching: boolean;
  search_response: Payment[];
}
