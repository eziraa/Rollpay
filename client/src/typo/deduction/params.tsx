export interface AddDeductionParams {
  deduction_type: string;
  deduction_rate: string;
}
export interface EditDeductionParams extends AddDeductionParams {
  id: string;
}
