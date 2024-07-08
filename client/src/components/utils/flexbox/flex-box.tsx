/* eslint-disable react-refresh/only-export-components */
import { css } from "styled-components";

export const row_template = css`
  display: flex;
  flex-direction: row;
`;

export const row_template_al_start = css`
  ${row_template};
  align-items: flex-start;
`;

export const row_template_al_end = css`
  ${row_template}
  align-items: flex-end;
`;

export const row_template_al_center = css`
  ${row_template}
  align-items: center;
`;

export const row_template_js_start = css`
  ${row_template}
  justify-content: start;
`;
export const row_template_js_center = css`
  ${row_template}
  justify-content: center;
`;

export const row_template_js_space_between = css`
  ${row_template}
  justify-content: space-between;
`;

export const row_template_js_space_around = css`
  ${row_template}
  justify-content: space-around;
`;

export const column_template = css`
  display: flex;
  flex-direction: column;
`;

export const column_template_al_start = css`
  ${column_template}
  align-items: flex-start;
`;

export const column_template_al_end = css`
  ${column_template}
  align-items: flex-end;
`;

export const column_template_al_center = css`
  ${column_template}
  align-items: center;
`;

export const column_template_js_center = css`
  ${column_template}
  justify-content: center;
`;

export const column_template_js_space_between = css`
  ${column_template}
  justify-content: space-between;
`;

export const column_template_js_space_around = css`
  ${column_template}
  justify-content: space-around;
`;
