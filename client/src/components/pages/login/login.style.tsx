import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
export const LoginContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  height: 100vh;
  width: 100vw;
`;

export const LoginSection = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  width: 23%;
  height: 60%;
  box-shadow: 0 0 1rem
    ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 1rem;
`;
export const Checkbox = styled.input`
  height: 1.5rem;
  width: 1.5rem;
`;
export const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  padding: 0rem 1rem;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;
`;
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const CustomLink = styled.a`
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  font-size: 1.2rem;
  /* right: 1rem; */
  /* font-weight: 500; */
  /* Unvisited link */
  a:link {
    color: blue;
  }

  /* Visited link */
  a:visited {
    color: #0543fd;
  }

  /* Mouse over link */
  a:hover {
    color: rgb(13, 0, 255);
  }

  /* Selected link */
  a:active {
    color: #0808f8;
  }
`;
export const LinkContainer = styled.div`
  position: relative;
  width: 30rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-items: left; */
`;
