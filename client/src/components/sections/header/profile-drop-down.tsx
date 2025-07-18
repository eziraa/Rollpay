import styled from "styled-components";
import { NormalBlurredText } from "../../utils/titles/titles";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Profile from "../profile/profile";
import { useState } from "react";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { useAuth } from "../../../hooks/auth-hook";
export const DropDownContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  background-color: aliceblue;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  &:hover {
    color: ${({ theme }) => theme.buttons.primary};
    background-color: ${({ theme }) =>
      addOpacityToColor(0.1, theme.buttons.primary)};
  }
  padding: 0.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
`;

export const ProfileToggle = styled.div`
  font-size: 2.5rem;
  font-weight: 500;
`;

export const DropDown = () => {
  const [openProfileMenu, setProfileMenu] = useState<boolean>();
  const { curr_user } = useAuth();
  const closeAction = () => {
    setProfileMenu(false);
  };

  return (
    <DropDownContainer
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setProfileMenu((prev) => !prev);
      }}
    >
      {openProfileMenu && <Profile close={closeAction} />}
      <UserInfo>
        <NormalBlurredText>{curr_user?.employee.first_name}</NormalBlurredText>
        <NormalBlurredText> {curr_user?.employee.position} </NormalBlurredText>
      </UserInfo>
      <ProfileToggle>
        {openProfileMenu ? <MdExpandLess /> : <MdExpandMore />}
      </ProfileToggle>
    </DropDownContainer>
  );
};
