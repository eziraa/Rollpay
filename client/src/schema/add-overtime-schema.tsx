import * as Yup from "yup";

export const AddOvertimeSchema = Yup.object({
  overtime_type: Yup.string().required("Please enter overtime type"),
  overtime_rate: Yup.number().required("Please enter overtime rate"),
});

export const AddOvertimeToEmpSchema = Yup.object({
  allowance_type: Yup.string().required("Please enter allowance type"),
  employee_id: Yup.number().required("Please enter employee ID"),
  start_date: Yup.date().required("Please enter start date"),
  end_date: Yup.date().required("Please enter end date"),
});
