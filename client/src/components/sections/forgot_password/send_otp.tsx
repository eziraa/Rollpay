/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import emailjs from "emailjs-com";
import { ForgotPasswordContainer } from "./forgot_password.style";
import { Title } from "../../pages/sign-up/sign-up.style";
import {
  Button,
  Form,
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatcher = useAppDispatch();
  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .send(
        "service_tfrx1er",
        "template_3ol2yro",
        {
          to_email: email,
          otp: generateOTP(),
        },
        "k3GlkvUNSNjbu-6bp"
      )
      .then(
        () => {
          dispatcher(
            setFlashMessage({
              color: "green",
              status: true,
              title: "Send OTP",
              desc: "OTP sent successfully",
              duration: 3,
            })
          );
        },
        () => {
          dispatcher(
            setFlashMessage({
              color: "red",
              status: true,
              title: "Send OTP",
              desc: "Failed to send OTP",
              duration: 3,
            })
          );
        }
      );
  };

  return (
    <ForgotPasswordContainer>
      <Title>Reset Your Password</Title>
      <Form onSubmit={sendEmail}>
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
        <Button type="submit">Send OTP</Button>
      </Form>
    </ForgotPasswordContainer>
  );
};
