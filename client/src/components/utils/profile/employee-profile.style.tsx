import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import ProfileI from "../../../assets/profile.png";
import Placeholder from "../../../assets/placeholde.jpg";

import { ThemeProps } from "../../../typo/theme/theme";
import { IconContainer } from "../../sections/profile/profile.style";

export const EmployeeeProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 30rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  border-radius: 1rem;
  height: auto;
  padding: 1rem;
  gap: 2rem;
  position: relative;
  min-height: 60vh;
  margin-top: 3rem;
  padding-top: 2rem;
`;

export const Button = styled.button`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.buttons.primary};
  border-radius: 0.5rem;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  vertical-align: baseline;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
  }
`;
interface Props {
  profile: string;
}
export const ProfileContainer = styled.div<Props>`
  display: inline-block;
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  padding: 0rem;
  background-image: ${(props) =>
    props.profile ? `url(${props.profile})` : `url(${Placeholder})`};

  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  padding: 4rem 0 0 3rem;
  cursor: pointer;
`;

export const InputButton = styled.button`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  font-size: medium;
  width: 5rem;
  height: 2.5rem;
  background-color: transparent;
  padding: 0;
  margin: 0;
`;

export const Icon = styled(IconContainer)`
  margin-top: 4.4rem;
  margin-left: 0.5rem;
  padding-top: 0.4rem;
  width: 2.7rem;
  height: 2.7rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  background-color: ${({ theme }) =>
    addOpacityToColor(0.5, theme.colors.primary)};
  border-radius: 2.7rem;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  padding: 0rem;
  background: url(${ProfileI}), linear-gradient(90deg, #60565596, #6866619d);
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
  position: absolute;
  bottom: 0.5rem;
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

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex: 3.8;
  gap: 0rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;

interface NavItemProps extends ThemeProps {
  active?: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  padding: 1rem 2rem;
  display: inline-block;
  font-size: 1.7rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 0.5rem solid;
  border-bottom-color: ${({ active, theme }) =>
    active ? theme.buttons.primary : "transparent"};
`;

export const DeleteButton = styled(Button)`
  background-color: #f46262;
  color: #fbfbfb;
  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;
