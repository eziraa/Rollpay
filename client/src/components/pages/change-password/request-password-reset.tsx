import { useState } from "react";
import axios from "axios";
import api from "../../../config/api";
import { useTheme } from "styled-components";
import { Theme } from "../../../theme/theme";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { buttons } = useTheme() as Theme;
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSending(true);
    setMessage("");
    try {
      await api.post("/otp/password-reset/", { email }).then(() => {
        dispatch(
          setFlashMessage({
            type: "success",
            desc: "The email sent. Check your email",
            status: true,
            title: "Sending Email",
            duration: 5000,
          })
        );
        setEmail("");
      });
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
        <h2 className="text-2xl font-bold mb-6 text-center">
          Request Password Reset
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={` rounded-md w-full px-2 py-3 text-2xl mt-3 text-slate-100 ${
              sending && "bg-slate-400"
            }`}
            style={{
              backgroundColor: !sending ? buttons.primary : "",
            }}
          >
            Request Password Reset
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default RequestPasswordReset;
