import {
  Button,
  Form,
  Input,
  InputContainer,
  Label,
  Title,
} from "../../utils/form_elements/form.style";
import { HomeContainer } from "../home/homepage.style";
import { Link } from "../login/login.style";
import { ForgotPasswordContainer } from "./forgot_password.style";

export const ForgotPassword = () => {
  return (
    <HomeContainer
      style={{
        justifyContent: "center",
      }}
    >
      <ForgotPasswordContainer>
        <Title>Reset Your Password</Title>
        <Form>
          <InputContainer>
            <Label>Enter your email</Label>
            <Input />
          </InputContainer>
          <Button type="submit" onClick={(e) => e.stopPropagation()}>
            Get OTP
          </Button>
        </Form>
        <Link>Log in</Link>
      </ForgotPasswordContainer>
    </HomeContainer>
  );
};
