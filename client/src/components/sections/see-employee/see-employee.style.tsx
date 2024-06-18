import styled from "styled-components";
import Profile from "../../../assets/profile.png";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
export const SeeEmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 3rem;
  position: relative;
  gap: 1rem;
`;

export const SeeEmployeeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex: 1.4;
  align-items: center;
  gap: 2rem;
`;
export const EditEmployeeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 90%;
  gap: 4rem;
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
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
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
  border: 2px solid ${({ theme }) => theme.colors.primary};
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

export const EmployeeData = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  width: 100%;
`;

export const DataLabel = styled.h5`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  flex: 1;
  text-align: left;
`;

export const DataValue = styled.h5`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  flex: 1.5;
`;

export const EditButton = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  width: 10rem;
  display: flex;
  gap: 1rem;
  font-size: medium;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const BackButton = styled.div`
  font-size: 3rem;
  display: inline-block;
  color: ${({ theme }) => theme.buttons.primary};
  cursor: pointer;
  border-radius: 5px;
  padding-bottom: -0.4rem;
  text-align: center;
  &:hover {
    color: ${({ theme }) => addOpacityToColor(0.4, theme.buttons.primaryHover)};
  }
`;

export const ActionBtnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  padding: 2rem 0;
`;

export const ActionBtn = styled.div`
  border-radius: 10px;
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

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 3.8;
  gap: 5rem;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.05, theme.colors.primary)};
`;

export const NavItem = styled.div`
  padding: 1rem 2rem;
  display: inline-block;
  font-size: 1.7rem;
  cursor: pointer;
  width: 20%;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.5, theme.backgrounds.secondary)};
  }
`;

export const DeleteButton = styled(Button)`
  background-color: ${({ theme }) =>
    addOpacityToColor(0.5, theme.colors.primary)};
`;
