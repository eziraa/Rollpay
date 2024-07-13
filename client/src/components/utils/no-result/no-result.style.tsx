import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const NoResultContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const NoResultText = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  font-weight: 500;
  height: 3rem;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
