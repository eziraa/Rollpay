import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  InputContainer,
  Label,
  Title,
} from "../../utils/form_elements/form.style";
import { HomeContainer } from "../home/homepage.style";
import { CustomLink } from "../login/login.style";
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
        <CustomLink>
          <Link to="/">Log in</Link>
        </CustomLink>
      </ForgotPasswordContainer>
    </HomeContainer>
  );
};
