import * as Yup from "yup";

export const AddDeductionSchema = Yup.object({
  deduction_type: Yup.string()
    .required("Please enter deduction name")
    .min(3, "Deduction name should be at least 3 characters"),

  deduction_rate: Yup.number().required("Please enter deduction rate"),
});
