import { useState } from "react";
import { Header } from "../../sections/header/header";
import { FlashMessage } from "../../utils/flash_message/flash_message";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Button,
  Title,
  PasswordContainer,
} from "../../utils/form_elements/form.style";
import { PasswordVisible } from "../../utils/password_visiblity/password.style";
import { HomeContainer } from "../home/homepage.style";
import {
  Text,
  CheckboxContainer,
  Link,
  LoginContainer,
  LinkContainer,
} from "./login.style";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };
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
            <PasswordContainer>
              <input type={passwordVisible ? "text" : "password"} />
              <PasswordVisible onClick={togglePasswordVisiblity}>
                {passwordVisible ? <RiEyeFill /> : <RiEyeOffFill />}
              </PasswordVisible>
            </PasswordContainer>
          </InputContainer>
          <CheckboxContainer>
            <Link href="#"> Frogot Password? </Link>
          </CheckboxContainer>

          <Button type="submit" onClick={(e) => e.stopPropagation()}>
            Login
          </Button>
        </Form>
        <LinkContainer>
          <Text>
            Don't have an account? <Link href="#"> Create new Account </Link>
          </Text>
        </LinkContainer>
      </LoginContainer>
      <FlashMessage />
    </HomeContainer>
  );
};
