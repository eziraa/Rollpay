import styled from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const EditEmployeeBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
  position: relative;
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

export const SaveButton = styled.button`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const CancelButton = styled.button`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.backgrounds.primary};
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.backgrounds.secondary};
  }
`;

export const ActionBtnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  padding: 2rem 0;
`;

export const ActionBtn = styled.div`
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.backgrounds.primary};
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.colors.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const SaveBtn = styled(SaveButton)`
  width: 10rem;
  bottom: 1rem;
  position: absolute;
  left: 53.5%;
  bottom: -4rem;
`;
