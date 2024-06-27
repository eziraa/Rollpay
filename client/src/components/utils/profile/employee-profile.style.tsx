import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import ProfileI from "../../../assets/profile.png";
import { ThemeProps } from "../../../typo/theme/theme";
import { IconContainer } from "../../sections/profile/profile.style";

export const EmployeeeProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 30rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  height: auto;
  padding: 1rem;
  gap: 2rem;
`;

export const Button = styled.button`
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.buttons.primary};
  border-radius: 5px;
  width: 10rem;
  display: flex;
  gap: 1rem;
  font-size: medium;
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
  border: 0.1rem solid green;
  border-radius: 50%;
  padding: 0rem;
  background-image: url(${(props) => props.profile});
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  padding: 4rem 0 0 3rem;
`;

export const InputButton = styled.button`
  font-size: 1.2rem;
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 5px;
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
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.backgrounds.primary};
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

export const BackButton = styled.div`
  font-size: 3rem;
  display: inline-block;
  color: ${({ theme }) => theme.buttons.primary};
  cursor: pointer;
  border-radius: 5px;
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
  letter-spacing: 1px;
  cursor: pointer;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 0.5rem solid;
  border-bottom-color: ${({ active, theme }) =>
    active ? theme.buttons.primary : "transparent"};
`;

export const DeleteButton = styled(Button)`
  /* background-color: ${({ theme }) =>
    addOpacityToColor(0.6, theme.buttons.primary)}; */
  background-color: white;
  border: 0.2rem solid #dc3545;
  color: #dc3545;
  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;
