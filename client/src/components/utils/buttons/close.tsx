import { RiCloseFill } from "react-icons/ri";
import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add_opacity_color";

export const CloseIcon = styled(RiCloseFill)`
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};

  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 3.4rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  position: absolute;
  right: 0.4rem;
  top: 0.4rem;
`;
