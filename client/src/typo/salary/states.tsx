import { Employee, SalaryEmpResponse } from "./response";

export interface BillEmpState {
  loading: boolean;
  response: SalaryEmpResponse | undefined;
  searching: boolean;
  search_response: Employee[];
}
