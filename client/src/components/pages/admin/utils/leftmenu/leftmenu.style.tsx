import styled from "styled-components";
import { addOpacityToColor } from "../../../../utils/convertor/add-opacity-color";

export const LeftMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 1rem;
  height: 100%;
  min-height: 40rem;
  border: 0.2rem solid
    ${({ theme }) => addOpacityToColor(0.1, theme.colors.primary)};
`;
