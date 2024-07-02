import * as Yup from "yup";

export const AddOvertimeSchema = Yup.object({
  overtime_type: Yup.string().required("Please enter overtime type"),
  overtime_rate: Yup.number().required("Please enter overtime rate"),
});

export const AddOvertimeToEmpSchema = Yup.object({
  overtime_type: Yup.string().required("Please select allowance type"),
  start_time: Yup.date()
    .required("Start time is required")
    .max(new Date(), "Start date and time must be today or in the past")
    .when("$now", (now, schema) => {
      return schema.max(
        now,
        "Start date and time must be today or in the past"
      );
    }),
  end_time: Yup.date()
    .required("End time is required")
    .min(
      Yup.ref("start_time"),
      "End date and time must be after start date and time"
    )
    .max(new Date(), "End date and time must be today or in the past")
    .when("start_time", (_, schema) => {
      const start_time_Obj = new Date();
      return schema.min(
        start_time_Obj,
        "End date and time must be after start date and time"
      );
    }),
});
