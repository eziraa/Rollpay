import * as Yup from 'yup';
const pattern = RegExp("");

export const EmpPersonalInfo = Yup.object({
  username: Yup.string()
    .min(3, "Username should be at least 3 characters")
    .required("Please Enter username"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please Enter email"),
  firstName: Yup.string()
    .min(3, "First name should be at least 3 characters")
    .required("Please Enter name"),
  lastName: Yup.string()
    .min(3, "Last name should be at least 3 characters")
    .required("Please Enter name"),
  phoneNumber: Yup.string()
    .min(10, "Password should be atleast 10 characters")
    .matches(pattern, "Please enter valid phone number")
    .required("Please Enter phone number"),
});
