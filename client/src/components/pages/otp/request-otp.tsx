import { useState } from "react";
import axios from "axios";
import api from "../../../config/api";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { ForgotPasswordContainer } from "../forgot_password/forgot_password.style";
import {
  Form,
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { useTheme } from "styled-components";
import { Theme } from "../../../theme/theme";

const RequestOTP = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const [sending, setSending] = useState(false);
  const { buttons } = useTheme() as Theme;
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSending(true);
    setMessage("");
    try {
      const response = await api.post("/otp/generate-otp/", { email });
      if (response.status === 200) {
        dispatch(
          setFlashMessage({
            type: "success",
            status: true,
            title: "Sending OTP",
            desc: response.data.message,
            duration: 5000,
          })
        );
        setEmail("");
        window.location.href = "/reset-password";
      }
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
      <ForgotPasswordContainer className="shadow-lg">
        <h2 className="text-4xl font-extralight mb-6  text-center text-gray-700 ">
          Generate & Send OTP
        </h2>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Enter your email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>
          <button
            disabled={sending}
            type="submit"
            className={` rounded-md px-2 py-3 text-2xl mt-3 ${
              sending && "bg-slate-400"
            }`}
            style={{
              backgroundColor: !sending ? buttons.primary : "",
            }}
          >
            Send OTP
          </button>
        </Form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </ForgotPasswordContainer>
    </div>
  );
};

export default RequestOTP;
