import styled from "styled-components";
import {
  body_css,
  btn_css,
  container_css,
  header_css,
  title_css,
} from "../../utils/containers/containers.style";
import { custom_vertical_scroll_bar } from "../../utils/scroll-bar/scroll-bar";

export const Container = styled.div`
  ${container_css}
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  ${header_css}
`;

export const Title = styled.h1`
  ${title_css}
`;

export const AddButton = styled.button`
  ${btn_css}
`;

export const Body = styled.div`
  ${body_css}
  ${custom_vertical_scroll_bar};
  height: 100%;
  width: 100%;
`;
