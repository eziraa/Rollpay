import styled from "styled-components";
import { ItemContainer } from "../../sections/profile/profile.style";

export const UserProfileContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;
export const Item = styled(ItemContainer)`
  align-items: baseline;
`;

export const UserProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 2rem;
`;

export const UserProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 90%;
  padding: 1rem 2rem;
`;

export const UserProfileContent = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  height: 85%;
`;

