import { ThemeProps } from "../../../typo/theme/theme";
import { Button } from "../../utils/form-elements/form.style";
import styled from "styled-components";

import { container } from "../../utils/pages-utils/containers.style";

export const PositionListContainer = styled.div<ThemeProps>`
  ${container}
`;

export const PositionListBody = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 60vh;
  width: 100%;
  padding: 2rem 5rem;
`;

export const PositionDisplayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Title = styled.h1<ThemeProps>`
  font-size: 2rem;
  font-weight: 500;
  margin: 0rem;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PositionListHeader = styled.div`
  margin-bottom: 1rem;
  margin-top: 3rem;
  padding: 0 5rem;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AddButton = styled(Button)`
  width: fit-content;
  display: block;
`;

export const ActionBtnsContainer = styled.td`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 0.5rem 0rem;
  justify-content: flex-start;
  width: 80%;
`;
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0.1rem solid #2f8236;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  gap: 0.3rem;
  /* flex: 1; */
  &:hover {
    background-color: #2f8236;
    color: #ffffff;
  }
`;

export const EditButton = styled(ActionButton)`
  border: none;
  /* flex: 0.6; */
  &:hover {
    background-color: #69a199;
    color: #ffffff;
  }
`;
export const SuspendButton = styled(ActionButton)`
  border: none;
  &:hover {
    background-color: #69a199;
    color: #ffffff;
  }
`;

export const DeleteButton = styled(ActionButton)`
  color: #dc3545;
  border: none;
  &:hover {
    background-color: #69a199;
    color: #ffffff;
  }
`;
