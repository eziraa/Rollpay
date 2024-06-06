import {
  SignUpContainer,
  Title,
  Button,
  InputName,
  InputBox,
} from "./SignUp.style";
const SignUp = () => {
  return (
    <SignUpContainer>
      <Title>Create Account</Title>
      <InputName>Username: </InputName>
      <InputBox />
      <InputName>Email: </InputName>
      <InputBox />
      <InputName>Password: </InputName>
      <InputBox />
      <InputName>Confirm Password: </InputName>
      <InputBox />
      <br />

      <Button> Create </Button>
    </SignUpContainer>
  );
};

export default SignUp;
