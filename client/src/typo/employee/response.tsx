import { PaginatedBackEndResponse, PaginatedResponse } from "../utils/response";
export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  position: string;
  phone_number: string;
  date_of_birth: string;
  date_of_hire: string;
  salary: number;
}

export interface AddEmpResponse {
  success: string;
  error: string;
  code: number;
  employee: Employee;
}

export interface PaginatedEmpResponse extends PaginatedResponse {
  results: Employee[];
}

export interface PaginatedEmpBackEndResponse extends PaginatedBackEndResponse {
  results: Employee[];
}
