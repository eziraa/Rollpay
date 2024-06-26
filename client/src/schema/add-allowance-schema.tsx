import * as Yup from "yup";

export const AddAllowanceSchema = Yup.object({
  allowance_type: Yup.string().required("Please Enter allowance name"),
  allowance_rate: Yup.number().required("Please Enter allowance rate"),
});
