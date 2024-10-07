import styled from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { Button } from "../../utils/form-elements/form.style";

export const EditEmployeeBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 50rem;
  padding: 1rem;
  gap: 1rem;
  position: relative;
  margin-top: -3rem;
`;
export const InputField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;
export const Label = styled.h5`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  text-align: left;
  padding: 1rem 2rem;
`;

export const SaveBtn = styled(Button)`
  padding: 0.5rem;
  width: 8rem;
  background-color: ${({ theme }) => theme.buttons.primary};
`;
export const CancelBtn = styled(Button)`
  width: fit-content;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.5, theme.buttons.primary)};
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 66%;
  padding: 0 0;
  align-self: self-start;
  justify-content: flex-end;
  position: relative;
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 0.3rem;
  cursor: pointer;
  justify-self: start;
  font-size: 1.4rem;
  position: absolute;
  left: -1rem;
  font-weight: 900;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  top: -2rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CloseButton = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 0.5rem;
  cursor: pointer;
  justify-self: end;
  font-size: 1.4rem;
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;