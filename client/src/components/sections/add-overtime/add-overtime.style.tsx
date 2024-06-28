import styled from "styled-components";
import { Form } from "../../utils/form-elements/form.style";
import {
  add_body,
  add_btn,
  add_container,
} from "../../utils/add-item/add.styl";

export const OvertimeContainer = styled.div`
  ${add_container};
`;

export const OvertimeBody = styled.div`
  ${add_body}
`;

export const AddBtn = styled.button`
  ${add_btn}
`;

export const OvertimeForm = styled(Form)``;
