import * as Yup from "yup";

export const AddOvertimeSchema = Yup.object({
  overtime_type: Yup.string()
    .required("Please enter overtime type")
    .min(3, "Overtime name should be at least 3 characters"),
  overtime_rate: Yup.number().required("Please enter overtime rate"),
});

export const AddOvertimeToEmpSchema = Yup.object().shape({
  overtime_type: Yup.string().required("Please select allowance type"),
  start_time: Yup.date()
    .required("Start time is required")
    .max(new Date(), "Start time cannot be in the future")
    .test(
      "is-valid-start-end",
      "Start time must be less than end time",
      function (value) {
        const { end_time } = this.parent;
        if (end_time) {
          return new Date(value) < new Date(end_time);
        }
        return true;
      }
    ),
  end_time: Yup.date()
    .required("End time is required")
    .max(new Date(), "End time cannot be in the futurrrre")
    .test(
      "is-valid-end-start",
      "End time must be greater than start time",
      function (value) {
        const { start_time } = this.parent;
        if (start_time) {
          return new Date(value) > new Date(start_time);
        }
        return true;
      }
    )
    .test(
      "is-same-day-valid-time",
      "On the same day, start time must be less than end time",
      function (value) {
        const { start_time } = this.parent;
        if (
          start_time &&
          new Date(start_time).toDateString() === new Date(value).toDateString()
        ) {
          return new Date(start_time).getTime() < new Date(value).getTime();
        }
        return true;
      }
    ),
});
