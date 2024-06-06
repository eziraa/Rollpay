import { css } from "styled-components";
import styled from "styled-components";

const Text = css`
  color: rgb(2, 255, 192);
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
`;
export const SignUpContainer = styled.form`
  height: 70vh;
  width: 25vw;
  border: 0.5rem solid rgba(82, 255, 212, 0.847);
  border-radius: 20px;
  margin: 20px 450px;
  padding: 10px;
`;
export const Title = styled.h1`
  ${Text}
  font-size: 30px;
  margin: 20px 80px;
`;
export const InputBox = styled.input`
  ${Text}
  height: 20px;
  width: 350px;
  border: 1px solid rgba(82, 255, 212, 0.847);
  border-radius: 10px;
  padding: 10px;
  margin: 0px 10px;
  outline: 1px solid rgba(82, 255, 212, 0.847);
`;
export const InputName = styled.p`
  ${Text}
  margin: 0px 10px;
  font-size: 15px;
  font-weight: 500;
`;
export const Input = styled.div`
  margin: 10px 10px 0px 0px;
`;
export const ErrorMessage = styled.p`
  ${Text}
  margin: 0px 10px;
  font-size: 15px;
  font-weight: 500;
  padding-left: 10px;
  color: #f47a7a;
`;
export const Button = styled.button`
  width: 100px;
  height: 35px;
  margin: 10px 140px;
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
