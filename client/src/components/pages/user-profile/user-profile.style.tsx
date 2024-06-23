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
