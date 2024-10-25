import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";
import { custom_vertical_scroll_bar } from "../../../../utils/scroll-bar/scroll-bar";
import { Input } from "../../../../utils/form-elements/form.style";

export const AddItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  max-height: 85vh;
  ${custom_vertical_scroll_bar}
  flex: 1;
  gap: 1rem;
  width: 100%;
  padding: 1rem 3rem;
  margin-bottom: 2rem;
`;

export const CheckBox = styled.input`
  margin-right: 1rem;
  height: 20px;
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
export const AddItemInput = styled(Input)`
  border-radius: 5px;
  flex: 1.2rem;
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
  gap: 2rem;
`;

export const DataLabel = styled.div`
  background-color: ${({ theme }) =>
    addOpacityToColor(0.75, theme.buttons.primary)};
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1rem;
  width: 100%;
  height: fit-content;
  gap: 2rem;
  margin-top: 2rem;
`;

export const ItemTitle = styled.h3`
  font-size: 1.9rem;
  letter-spacing: 1.2px;
  color: ${({ theme }) => theme.backgrounds.primary};
`;

export const RowTamplate = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  justify-content: start;
`;
