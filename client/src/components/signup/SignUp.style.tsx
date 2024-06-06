import { css } from "styled-components";
import styled from "styled-components";

const Text = css`
  color: rgb(2, 255, 192);
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
`;
export const SignUpContainer = styled.form`
  height: 600px;
  width: 500px;
  border: 5px solid rgba(82, 255, 212, 0.847);
  border-radius: 30px;
  /* background-color: aliceblue; */
  margin: 50px 450px;
  padding: 20px;
`;
export const Title = styled.h1`
  ${Text}
  font-size: 40px;
  margin: 40px 100px;
`;
export const InputBox = styled.input`
  ${Text}
  height: 30px;
  width: 350px;
  border: 2px solid rgba(82, 255, 212, 0.847);
  border-radius: 10px;
  padding: 10px;
  margin: 0px 20px;
  :focus {
    border: 2px solid rgba(82, 255, 212, 0.847);
  }
`;
export const InputName = styled.p`
  ${Text}
  margin: 10px 20px;
  font-size: 20px;
`;

export const Button = styled.button`
  width: 100px;
  height: 35px;
  margin: 20px 140px;
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
  background-color: #198754;
  border-color: #198754;
  :hover {
    color: #fff;
    background-color: #157347;
    border-color: #146c43;
  }
`;
