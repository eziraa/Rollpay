import styled from "styled-components";
import {
  body_css,
  btn_css,
  container_css,
  header_css,
  title_css,
} from "../../utils/containers/containers.style";
import { custom_vertical_scroll_bar } from "../../utils/scroll-bar/scroll-bar";

export const AllowanceContainer = styled.div`
  ${container_css}
  width: 58vw;
`;

export const AllowanceHeader = styled.div`
  ${header_css}
`;

export const AllowanceTitle = styled.h1`
  ${title_css}
`;

export const AddButton = styled.button`
  ${btn_css}
`;

export const AllowanceBody = styled.div`
  ${body_css}
  ${custom_vertical_scroll_bar};
  height: 60vh;
`;
