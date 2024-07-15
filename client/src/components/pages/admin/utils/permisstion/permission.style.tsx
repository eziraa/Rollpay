import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";
import { custom_vertical_scroll_bar } from "../../../../utils/scroll-bar/scroll-bar";
import { NormalBlurredText } from "../../../../utils/titles/titles";

export const PermissionContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  flex: 1;
  height: fit-content;
  max-height: 50vh;
  padding: 1rem;
  border-top: 2px solid ${({ theme }) => theme.colors.secondary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;
export const BlurredText = styled(NormalBlurredText)`
  text-align: end;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
`;
export const Header = styled.div`
  flex: 0.7;
  display: flex;
  gap: 0.5rem;
  align-items: start;
  justify-content: start;
`;
export const PermissionGroup = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 100%;
  flex: 1;
  border: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.23, theme.colors.primary)};
`;

export const PermissionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  width: 100%;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
  background-color: ${({ theme }) =>
    addOpacityToColor(0.15, theme.colors.primary)};
  border-bottom: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.23, theme.colors.primary)};
  padding: 1rem;
`;

export const PermissionFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.4rem;
  border-bottom: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.23, theme.colors.primary)};
  border-top: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.23, theme.colors.primary)};
  color: ${({ theme }) => addOpacityToColor(0.75, theme.colors.primary)};
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.23, theme.colors.primary)};
  outline: none;
  border-radius: 0.3rem;
  flex: 1;
`;

export const PermissionList = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(3rem, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  ${custom_vertical_scroll_bar}
  height: 100%;
  max-height: 30vh;
  padding-bottom: 2rem;
`;

export const PermissionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
  border-bottom: 0.1rem solid
    ${({ theme }) => addOpacityToColor(0.23, theme.colors.primary)};
  transition: background-color 0.3s ease;
`;

export const Adder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const ChooseBtn = styled.button`
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  width: fit-content;
  align-self: center;
  justify-self: end;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
    transition: background-color 0.3s ease;
  }

  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  margin-bottom: 1rem;
`;
