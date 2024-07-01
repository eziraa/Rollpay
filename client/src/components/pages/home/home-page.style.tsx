import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { body, container } from "../../utils/pages-utils/containers.style";

export const HomeContainer = styled.div<ThemeProps>`
  ${container}
  flex-direction: row;
`;

export const HomeBody = styled.div<ThemeProps>`
  ${body}
  flex-direction: column;
  flex: 1;
  padding: 1rem;
`;

