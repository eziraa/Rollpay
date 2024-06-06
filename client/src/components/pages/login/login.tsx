import { Header } from "../../sections/header/header";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Button,
  Title,
} from "../../utils/form_elements/form.style";
import { HomeContainer } from "../home/homepage.style";
import { LoginContainer } from "./login.style";

export const LoginPage = () => {
  return (
    <HomeContainer>
      <Header />
      <LoginContainer>
        <Title>Log In</Title>
        <Form>
          <InputContainer>
            <Label>User name</Label>
            <Input />
          </InputContainer>
          <InputContainer>
            <Label>Password</Label>
            <Input />
          </InputContainer>
          <Button type="submit" onClick={(e) => e.stopPropagation()}>
            Login
          </Button>
        </Form>
      </LoginContainer>
    </HomeContainer>
  );
};
