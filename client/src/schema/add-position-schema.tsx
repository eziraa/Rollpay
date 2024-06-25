import * as Yup from "yup";

export const AddPositionSchema = Yup.object({
  position_name: Yup.string().required("Please Enter position name"),
  basic_salary: Yup.number().required("Please Enter position inital salary"),
});
