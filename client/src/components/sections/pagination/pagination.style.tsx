import styled, { css } from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { Button } from "../../utils/form-elements/form.style";

export const PaginationContainer = styled.div`
  width: 85%;
  position: absolute;
  bottom: 0rem;
  right: 3rem;
`;
export const BottomContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  margin: 0rem 2rem;
  background-color: transparent;
  right: 1rem;
`;

const text_css = css`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 2rem;
`;

export const Paragraph = styled.p`
  ${text_css};
`;
export const CurrentPageNumber = styled.input<ThemeProps>`
  font-size: 1.2rem;
  width: 6rem;
  margin: 1.5rem 0rem;
  padding: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Paragraph2 = styled.p`
  ${text_css}
  margin: 0rem 1rem;
  color: blue;
`;

export const PageNumber = styled.input`
  font-size: 1rem;
  width: 6rem;
  margin: 1.5rem 0rem;
  padding-bottom: 0.5rem;
`;
export const ButtonText = styled.p<ThemeProps>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.backgrounds.primary};
`;
export const ButtonName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Text = styled.p`
  ${text_css}
  margin: 0rem 0rem 0rem 1rem;
`;
export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

export const NavButton = styled(Button)<ThemeProps>`
  margin: 1rem;

  font-size: 1.6rem;

  padding: 0.5rem 0.5rem;

  width: 8rem;
`;
