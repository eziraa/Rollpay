import styled from "styled-components";
import {
  body_css,
  btn_css,
  container_css,
  header_css,
  title_css,
} from "../../utils/containers/containers.style";
import { custom_scroll_bar } from "../../utils/scroll-bar/scroll-bar";

export const OvertimeContainer = styled.div`
  ${container_css};
  width: 58vw;
`;
export const OvertimeHeader = styled.div`
  ${header_css};
`;

export const OvertimeTitle = styled.h1`
  ${title_css};
`;

export const AddButton = styled.button`
  ${btn_css};
`;

export const OvertimeBody = styled.div`
  ${body_css};
  ${custom_scroll_bar};
  height: 60vh;
`;
