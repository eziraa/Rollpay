import * as Yup from "yup";

export const AddOvertimeSchema = Yup.object({
  overtime_type: Yup.string().required("Please enter overtime type"),
  overtime_rate: Yup.number().required("Please enter overtime rate"),
});

export const AddOvertimeToEmpSchema = Yup.object({
  overtime_type: Yup.string().required("Please select allowance type"),
  start_time: Yup.date()
    .required("Start time is required"),
  end_time: Yup.date()
    .required("End time is required")
});
