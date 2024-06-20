import * as Yup from "yup";
const pattern: RegExp = /^(09|07)\d{8}$/;
export const AddEmployeeSchema = Yup.object({
  first_name: Yup.string()
    .required("Please Enter first name")
    .min(3, "First name should be at least 3 characters"),
  last_name: Yup.string()
    .required("Please Enter last name")
    .min(3, "Last name should be at least 3 characters"),
  gender: Yup.string().required("Please Enter gender"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please Enter email"),
  position: Yup.string()
    .required("Please Enter position")
    .min(3, "Position should be at least 3 characters"),
  date_of_birth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  date_of_hire: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  phone_number: Yup.string()
    .length(10, "Phone number should be 10 digits long")
    .matches(pattern, "Phone number should start with 09 or 07")
    .required("Please Enter phone number"),
  salary: Yup.number()
    .positive("Salary Should be positive")
    .required("Please Enter salary"),
});
