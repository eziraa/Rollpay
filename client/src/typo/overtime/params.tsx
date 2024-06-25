export interface AddOvertimeParams {
  overtime_name: string;
  overtime_rate: string;
  date_of_overtime: string;
  length: string;
}
export interface EditOvertimeParams extends AddOvertimeParams {
  id: string;
}
