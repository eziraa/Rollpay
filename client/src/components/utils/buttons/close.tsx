import { RiCloseFill } from "react-icons/ri";
import styled from "styled-components";

export const CloseIcon = styled(RiCloseFill)`
  color: ${({ theme }) => theme.backgrounds.secondary};
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 2.4rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.backgrounds.primary};
  }
  position: absolute;
  right: 0.4rem;
  top: 0.4rem;
`;
