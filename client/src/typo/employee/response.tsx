export interface EmployeeResponse {
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
  employee: EmployeeResponse;
}
