import styled, { css } from "styled-components";

export const mini_dot = css`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
`;

export const medium_dot = css`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
`;

export const large_dot = css`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

export const MiniDot = styled.div`
  ${mini_dot}
`;

export const MediumDot = styled.div`
  ${medium_dot}
`;

export const LargeDot = styled.div`
  ${large_dot}
`;
