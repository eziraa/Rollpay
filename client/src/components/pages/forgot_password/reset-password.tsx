import api from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { useTheme } from "styled-components";
import { Theme } from "../../../theme/theme";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { PasswordContainer } from "../../utils/form-elements/form.style";
import { PasswordVisible } from "../../utils/password-visiblity/password.style";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { pattern } from "../../../schema/sign-up-schema";
interface PasswordVisibility {
  newPassword: boolean;
  confirmPassword: boolean;
}
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { buttons } = useTheme() as Theme;
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<PasswordVisibility>({
    newPassword: false,
    confirmPassword: false,
  });
  const toggleVisibility = (type: "newPassword" | "confirmPassword") => () => {
    setPasswordVisible((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  const validationSchema = Yup.object({
    otp: Yup.string().required("OTP is required"),
    newPassword: Yup.string()
      .min(8, "Password should be atleast 8 characters")
      .matches(
        pattern,
        "Password should be a mixture of uppercase, lowercase letters, numbers, and special character"
      )
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (
    values: { otp: string; newPassword: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setMessage("");
    try {
      const response = await api.post("/otp/reset-password/", {
        otp: values.otp,
        new_password: values.newPassword,
      });
      dispatch(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Sending OTP",
          desc: response.data.message,
          duration: 5000,
        })
      );
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <Formik
          initialValues={{ otp: "", newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <PasswordContainer>
                  <Field
                    type={passwordVisible.newPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
                  />
                  <PasswordVisible onClick={toggleVisibility("newPassword")}>
                    {passwordVisible.newPassword ? (
                      <IoEyeOutline />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </PasswordVisible>
                </PasswordContainer>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <PasswordContainer>
                  <Field
                    type={passwordVisible.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
                  />
                  <PasswordVisible onClick={toggleVisibility("confirmPassword")}>
                    {passwordVisible.confirmPassword ? (
                      <IoEyeOutline />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </PasswordVisible>
                </PasswordContainer>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>


              <button
                type="submit"
                className={`rounded-md w-full px-2 py-3 text-2xl mt-3 text-slate-100 ${
                  isSubmitting && "bg-slate-400"
                }`}
                style={{
                  backgroundColor: !isSubmitting ? buttons.primary : "",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="text-end text-lg ">
          <a
            href="/forgot-password"
            className="underline-offset-2 decoration-4 text-blue-600"
          >
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
