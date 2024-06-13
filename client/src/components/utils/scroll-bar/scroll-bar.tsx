import styled from "styled-components";

export const ScrollBar = styled.tbody`
  overflow-y: scroll;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 55vh;
  top: 0rem;
  width: 100%;
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;
