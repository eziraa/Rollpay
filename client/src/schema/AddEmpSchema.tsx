import * as Yup from "yup";
const pattern = RegExp("");

export const EmpPersonalInfo = Yup.object({
  firstName: Yup.string()
    .required("Please Enter name")
    .min(3, "First name should be at least 3 characters"),
  lastName: Yup.string()
    .required("Please Enter name")
    .min(3, "Last name should be at least 3 characters"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please Enter email"),
  phoneNumber: Yup.string()
    .min(10, "Password should be atleast 10 characters")
    .matches(pattern, "Please enter valid phone number")
    .required("Please Enter phone number"),
});
