import * as Yup from "yup";

export const AddAllowanceSchema = Yup.object({
  allowance_type: Yup.string()
    .required("Please enter allowance name")
    .min(3, "Allowance name should be at least 3 characters"),

  allowance_rate: Yup.number().required("Please enter allowance rate"),
});

export const AddAllowanceToEmpSchema = Yup.object({
  allowance_type: Yup.string().required("Please select allowance type"),
});
