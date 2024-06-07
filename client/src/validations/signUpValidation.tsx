import * as Yup from "yup";
const pattern = RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*{~?\\]])(?!.*[<>])[A-Za-z\\d!@#$%^&*{~?\\]]+$"
);

export const SignUpValidation = Yup.object({
  username: Yup.string()
    .min(3, "Username should be at least 3 characters")
    .required("Please Enter username"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please Enter email"),
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
