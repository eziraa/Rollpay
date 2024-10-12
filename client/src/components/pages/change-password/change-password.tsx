import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/api";
import { useTheme } from "styled-components";
import { Theme } from "../../../theme/theme";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { PasswordContainer } from "../../utils/form-elements/form.style";
import { PasswordVisible } from "../../utils/password-visiblity/password.style";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
interface PasswordVisibility {
  newPassword: boolean;
  oldPassword: boolean;
  confirmPassword: boolean;
}
const ChangePassword = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { buttons } = useTheme() as Theme;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confimed, setConfirmed] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState<PasswordVisibility>({
    newPassword: false,
    oldPassword: false,
    confirmPassword: false,
  });
  const toggleVisibility =
    (type: "newPassword" | "oldPassword" | "confirmPassword") => () => {
      setPasswordVisible((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setSending(false);
      setConfirmed(false);
      return;
    } else {
      setConfirmed(true);
      setSending(true);
      setMessage("");
    }
    try {
      const response = await api.post(
        `/otp/password-reset-confirm/${uidb64}/${token}/`,
        { new_password: newPassword, old_password: oldPassword }
      );
      dispatch(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Password Reset",
          desc: response.data.message,
          duration: 5000,
        })
      );
      setOldPassword("");
      setNewPassword("");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordContainer>
            <input
              type={passwordVisible.oldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              required
              className="w-full relative px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <PasswordVisible onClick={toggleVisibility("oldPassword")}>
              {passwordVisible.oldPassword ? (
                <IoEyeOutline />
              ) : (
                <FaRegEyeSlash />
              )}
            </PasswordVisible>
          </PasswordContainer>
          <PasswordContainer>
            <input
              type={passwordVisible.newPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <PasswordVisible onClick={toggleVisibility("newPassword")}>
              {passwordVisible.newPassword ? (
                <IoEyeOutline />
              ) : (
                <FaRegEyeSlash />
              )}
            </PasswordVisible>
          </PasswordContainer>
          <PasswordContainer>
            <input
              type={passwordVisible.confirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <PasswordVisible onClick={toggleVisibility("confirmPassword")}>
              {passwordVisible.confirmPassword ? (
                <IoEyeOutline />
              ) : (
                <FaRegEyeSlash />
              )}
            </PasswordVisible>
          </PasswordContainer>
          {!confimed && <p className="text-red-500">Passwords do not match</p>}

          <button
            type="submit"
            className={` rounded-md w-full px-2 py-3 text-2xl mt-3 text-slate-100 ${
              sending && "bg-slate-400"
            }`}
            style={{
              backgroundColor: !sending ? buttons.primary : "",
            }}
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
