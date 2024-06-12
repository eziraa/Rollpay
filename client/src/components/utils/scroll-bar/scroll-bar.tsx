import styled from "styled-components";

export const ScrollBar = styled.tbody`
  overflow-y: scroll;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50vh;
  top: 4rem;
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;
