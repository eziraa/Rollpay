import * as Yup from "yup";
const pattern = RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*{~?\\]])(?!.*[<>])[A-Za-z\\d!@#$%^&*{~?\\]]+$"
);

export const SignUpSchema = Yup.object({
  username: Yup.string()
    .required("Please enter username")
    .min(3, "Username should be at least 3 characters"),
  empID: Yup.string()
    .required("Please enter Emplyee ID")
    .matches(/^ED\d{4}$/, "Employee ID must start with 'ED' followed by a 4-digit number"),
  password: Yup.string()
    .min(8, "Password should be atleast 8 characters")
    .matches(
      pattern,
      "Password should be a mixture of uppercase, lowercase letters, numbers, and special character"
    )
    .required("Please enter password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password does not match"
  ),
});
