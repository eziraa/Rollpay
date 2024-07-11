/* eslint-disable react-refresh/only-export-components */
import styled, { css } from "styled-components";
export const custom_vertical_scroll_bar = css`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.4rem;
  }
`;

export const custom_horizontal_scroll_bar = css`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.4rem;
  }
`;
export const ScrollBar = styled.div`
  height: 50vh;
  overflow-y: scroll;
  width: 100%;
  ${custom_vertical_scroll_bar}
`;
