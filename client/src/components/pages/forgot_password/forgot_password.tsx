/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import emailjs from "emailjs-com";
import { ForgotPasswordContainer } from "./forgot_password.style";
import { Title } from "../sign-up/sign-up.style";
import {
  Button,
  Form,
  Input,
  InputContainer,
  Label,
} from "../../utils/form-elements/form.style";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .send(
        "service_tfrx1er",
        "template_3ol2yro",
        { email },
        "k3GlkvUNSNjbu-6bp"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email sent successfully");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send email. Please try again.");
        }
      );
  };

  return (
    <ForgotPasswordContainer>
      <Title>Forgot Your Password</Title>
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
