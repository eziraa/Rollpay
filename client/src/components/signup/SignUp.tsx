import {
  SignUpContainer,
  Title,
  Button,
  Input,
  InputName,
  InputBox,
  ErrorMessage,
} from "./SignUp.style";
const SignUp = () => {
  return (
    <SignUpContainer>
      <Title>Create Account</Title>
      <Input>
        <InputName>Username: </InputName>
        <InputBox />
      </Input>
      <ErrorMessage>Error Message </ErrorMessage>

      <Input>
        <InputName>Email: </InputName>
        <InputBox />
      </Input>

      <ErrorMessage>Error Message </ErrorMessage>
      <Input>
        <InputName>Password: </InputName>
        <InputBox />
      </Input>

      <ErrorMessage>Error Message </ErrorMessage>
      <Input>
        <InputName>Confirm Password: </InputName>
        <InputBox />
      </Input>

      <ErrorMessage>Error Message </ErrorMessage>

      <br />

      <Button> Create </Button>
    </SignUpContainer>
  );
};

export default SignUp;
