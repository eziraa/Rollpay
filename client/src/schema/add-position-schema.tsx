import * as Yup from "yup";

export const AddPositionSchema = Yup.object({
  position_name: Yup.string()
    .required("Please enter position name")
    .min(3, "Position name should be atleast 3 characters"),
  basic_salary: Yup.number().required("Please enter position inital salary"),
});
