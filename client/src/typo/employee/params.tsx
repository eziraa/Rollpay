export interface AddEmpParams {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone_number: string;
  position: string;
  date_of_birth: string;
  date_of_hire: string;
}
export interface EditEmployeeParams extends AddEmpParams {
  id: string;
}

export interface AddSalaryParams {
  empID: string;
  salary: string;
}

export interface AddPositionParams {
  position_name: string;
  basic_salary: string;
}

export interface AddAllowanceToEmployeesParams {
  employee_id: string;
  allowance_type: string;
}

export interface AddDeductionToEmployeesParams {
  employee_id: string;
  deduction_type: string;
}

export interface UpdateProfileParams {
  employee_id: string;
  profile_url: File;
}

export interface UpdateEmployementContract {
  employee_id: string;
  file_url: File;
}
