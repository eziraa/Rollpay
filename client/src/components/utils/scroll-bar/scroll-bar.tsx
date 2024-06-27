/* eslint-disable react-refresh/only-export-components */
import styled, { css } from "styled-components";
export const custom_scroll_bar = css`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;
export const ScrollBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 55vh;
  top: 0rem;
  overflow-y: scroll;
  width: 100%;
  ${custom_scroll_bar}
`;
