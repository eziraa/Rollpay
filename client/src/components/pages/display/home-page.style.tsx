import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { body, container } from "../../utils/pages-utils/containers.style";

export const HomeContainer = styled.div<ThemeProps>`
  ${container}
`;

export const HomeBody = styled.div<ThemeProps>`
  ${body}
`;

