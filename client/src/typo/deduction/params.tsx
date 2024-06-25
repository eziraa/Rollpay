export interface AddDeductionParams {
  deduction_name: string;
  deduction_rate: string;
  date_of_start: string;
  date_of_end: string;
}
export interface EditDeductionParams extends AddDeductionParams {
  id: string;
}
