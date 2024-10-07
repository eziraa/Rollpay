import styled from "styled-components";
import Profile from "../../../assets/profile.png";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import {
  MainContainer,
  body,
  container,
  sub_header_css,
} from "../../utils/pages-utils/containers.style";
export const SeeEmployeeContainer = styled.div`
  ${container}
`;

export const SeeEmployeeBody = styled.div`
  ${body}
`;
export const SeeEmployeeHeader = styled.div`
  ${sub_header_css}
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 32.4rem;
  align-items: center;
  gap: 2rem;
`;
export const CurrEmployeeContent = styled(MainContainer)`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 4rem;
  padding: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const EmployeeeProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 30rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10rem;
  height: 100%;
  padding: 1rem;
  gap: 2rem;
`;

export const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  padding: 0rem;
  background: url(${Profile}), linear-gradient(90deg, #60565596, #6866619d);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  border: 0.2rem solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const EmployeeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 60%;
  padding: 1rem;
  gap: 1.5rem;
`;

export const Button = styled.button`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.buttons.primary};
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
  }
`;

export const BackButton = styled.div`
  font-size: 3rem;
  display: inline-block;
  color: ${({ theme }) => theme.buttons.primary};
  cursor: pointer;
  border-radius: 0.5rem;
  padding-bottom: -0.4rem;
  text-align: center;
  &:hover {
    color: ${({ theme }) => addOpacityToColor(0.75, theme.buttons.primary)};
  }
`;

export const ActionBtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 2rem 0;
`;

export const ActionBtn = styled.div`
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;
