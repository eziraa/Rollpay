import * as Yup from "yup";

export const LogInSchema = Yup.object({
  username: Yup.string().required("Please Enter username"),
  password: Yup.string().required("Please Enter password"),
});
