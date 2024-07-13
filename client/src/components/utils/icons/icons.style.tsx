import styled from "styled-components";
import { place_center } from "../flexbox/place-center.style";

export const SmallIcon = styled.div`
  ${place_center}
  padding: 1rem;
  font-size: 1.6rem;
`;

export const RoundedSmallIcon = styled(SmallIcon)`
  border-radius: 50%;
`;

export const MediumIcon = styled.div`
  ${place_center}
  padding: 1rem;
  font-size: 2rem;
`;

export const RoundedMediumIcon = styled(MediumIcon)`
  border-radius: 50%;
`;

export const LargeIcon = styled.div`
  ${place_center}
  padding: 1rem;
  font-size: 2.5rem;
`;

export const RoundedLargeIcon = styled(LargeIcon)`
  border-radius: 50%;
`;

export const ExtraLargeIcon = styled(LargeIcon)`
  font-size: 3.5rem;
`;

export const RoundedExtraLargeIcon = styled(ExtraLargeIcon)`
  border-radius: 50%;
`;

export const NormalIcon = styled.span`
  padding: 0.5rem;
`;
