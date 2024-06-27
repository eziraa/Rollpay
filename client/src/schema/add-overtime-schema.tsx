import * as Yup from "yup";

export const AddOvertime = Yup.object({
  overtime_type: Yup.string().required("Please enter overtime type"),
  overtime_rate: Yup.number().required("Please enter overtime rate"),
  overtime_length: Yup.number().required(
    "Please enter overtime length of timeline"
  ),
  overtime_date: Yup.date().required(
    "Please enter datetime of overtime timeline"
  ),
});
