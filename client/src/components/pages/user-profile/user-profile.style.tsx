import styled from "styled-components";
import { ItemContainer } from "../../sections/profile/profile.style";

export const UserHome = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const UserHomeBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  gap: 2rem;
`;
export const Item = styled(ItemContainer)`
  align-items: baseline;
`;

export const UserProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 85vh;
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

