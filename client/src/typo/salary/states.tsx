import { SalaryEmpResponse } from "./response";

export interface BillEmpState {
  loading: boolean;
  response: SalaryEmpResponse | undefined;
}
