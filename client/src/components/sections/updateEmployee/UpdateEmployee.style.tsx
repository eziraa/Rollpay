import { css } from "styled-components";
import styled from "styled-components";
import profile from "../../../assets/profile.png";
import { CgClose } from "react-icons/cg";
import { LoginContainer } from "../../pages/login/login.style";

const Text = css`
  color: ${({ theme }) => theme.colors.primary};
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
`;
export const UpdateContainer = styled(LoginContainer)`
  height: auto;
  position: relative;
  width: 25vw;
  border: 0.1rem solid ${({ theme }) => theme.backgrounds.secondary};
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Close = styled(CgClose)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  padding: 0.5rem;
  background: url(${profile}), linear-gradient(90deg, #60565596, #6866619d);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

export const ProfileImageContainer = styled.div`
  width: 20rem;
  height: 4.5rem;
  margin: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
`;

export const FileInput = styled.input`
  width: 13rem;
  height: 2rem;
  margin-left: 1rem;
`;

export const Title = styled.h1`
  ${Text}
  font-size: 1.5rem;
  margin: 10px 10px;
`;
