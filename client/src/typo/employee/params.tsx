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
  salary: string;
}

export interface AddSalaryParams {
  empID: string;
  salary: string;
}
