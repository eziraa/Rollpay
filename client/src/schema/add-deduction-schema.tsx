import * as Yup from "yup";

export const AddDeductionSchema = Yup.object({
  deduction_type: Yup.string().required("Please Enter deduction name"),
  deduction_rate: Yup.number().required("Please Enter deduction rate"),
});
