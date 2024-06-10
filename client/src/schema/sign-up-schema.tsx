import * as Yup from "yup";
const pattern = RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*{~?\\]])(?!.*[<>])[A-Za-z\\d!@#$%^&*{~?\\]]+$"
);

export const SignUpSchema = Yup.object({
  username: Yup.string()
    .required("Please Enter username")
    .min(3, "Username should be at least 3 characters"),
  empID: Yup.string()
    .required("Please Enter Emplyee ID")
    .min(9, "Empluyee ID should be at least 9 characters"),
  password: Yup.string()
    .min(8, "Password should be atleast 8 characters")
    .matches(
      pattern,
      "Password should be a mixture of uppercase, lowercase letters, numbers, and special character"
    )
    .required("Please Enter password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password does not match"
  ),
});
