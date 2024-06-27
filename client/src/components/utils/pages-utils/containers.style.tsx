import styled, { css } from "styled-components";

export const container = css`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 0.5rem;
`;

export const body = css`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
`;

export const sub_header_css = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 1rem;
  position: relative;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  height: 100%;
  width: 85vw;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;
