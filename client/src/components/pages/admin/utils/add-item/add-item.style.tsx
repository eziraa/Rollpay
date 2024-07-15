import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";

export const AddItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  height: 100%;
  flex: 1;
  gap: 1rem;
`;

export const AddItemTitle = styled.p`
  font-size: 2.1rem;
  height: fit-content;
  letter-spacing: 0.15rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
`;

export const AddItemForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 35%;
  height: fit-content;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;
export const AddItemInput = styled.input`
  padding: 0.71rem;
  border: 1px solid
    ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  border-radius: 5px;
  flex: 1.2;
`;

export const AddItemLabel = styled.label`
  font-size: 1.3rem;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  flex: 0.8;
`;

export const ActionContainer = styled.div`
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1rem;
  width: 100%;
  height: fit-content;
`;
