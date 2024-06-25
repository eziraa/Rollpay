export interface AddAllowanceParams {
  allowance_name: string;
  allowance_rate: string;
  date_of_start: string;
  date_of_end: string;
}
export interface EditAllowanceParams extends AddAllowanceParams {
  id: string;
}
