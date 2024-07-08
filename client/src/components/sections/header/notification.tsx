import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { IoMdNotifications } from "react-icons/io";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const NotificationContainer = styled.div<ThemeProps>`
  font-size: 2.5rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  position: relative;
`;

export const NotificationCount = styled.p`
  font-size: 1rem;
  padding: 0 0.3rem;
  height: fit-content;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  top: 0rem;
  left: 1rem;
  letter-spacing: 0.1rem;
  background-color: red;
  color: white;
`;

export const Notification = () => {
  return (
    <NotificationContainer>
      <IoMdNotifications />
      <NotificationCount>3</NotificationCount>
    </NotificationContainer>
  );
};
