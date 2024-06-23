import styled from "styled-components";
import { Form } from "../../utils/form-elements/form.style";
import {
  add_body,
  add_btn,
  add_container,
} from "../../utils/add-item/add.styl";

export const PositionContainer = styled.div`
  ${add_container};
`;

export const PositionBody = styled.div`
  ${add_body}
`;

export const AddBtn = styled.div`
  ${add_btn}
`;

export const PositionForm = styled(Form)``;
