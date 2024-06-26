export interface AddAllowanceParams {
  allowance_type: string;
  allowance_rate: string;
}
export interface EditAllowanceParams extends AddAllowanceParams {
  id: string;
}
