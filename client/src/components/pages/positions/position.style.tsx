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
  width: 100%;
  display: flex;
  align-items: center;
`;

export const AddButton = styled(Button)`
  width: fit-content;
  justify-self: end;
  display: block;
  position: absolute;
  right: 3rem;
`;

export const ActionBtnsContainer = styled.td`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  justify-content: flex-end;
  width: 80%;
`;
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid #2f8236;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  gap: 0.3rem;
  flex: 1;
  &:hover {
    background-color: #2f8236;
    color: #ffffff;
  }
`;

export const EditButton = styled(ActionButton)`
  border: 1px solid #369143;
  flex: 0.6;
  &:hover {
    background-color: #369143;
    color: #ffffff;
  }
`;
export const SuspendButton = styled(ActionButton)`
  color: #ad6e01;
  border: 1px solid #ad6e01;
  &:hover {
    background-color: #ad6e01;
    color: #ffffff;
  }
`;

export const DeleteButton = styled(ActionButton)`
  color: #dc3545;
  border: 1px solid #dc3545;
  &:hover {
    background-color: #dc3545;
    color: #ffffff;
  }
`;
