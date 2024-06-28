export interface AddOvertimeParams {
  overtime_type: string;
  overtime_rate: string;
}

export interface AddOvertimeToEmpParams {
  overtime_id: string;
  employee_id: string;
  start_time: string;
  end_time: string;
}
export interface EditOvertimeParams extends AddOvertimeParams {
  id: string;
}
