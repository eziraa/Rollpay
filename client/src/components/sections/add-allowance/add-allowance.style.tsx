import styled from "styled-components";
import { Form } from "../../utils/form-elements/form.style";
import {
  add_body,
  add_btn,
  add_container,
} from "../../utils/add-item/add.styl";

export const AllowanceContainer = styled.div`
  ${add_container};
`;

export const AllowanceBody = styled.div`
  ${add_body}
`;

export const AddBtn = styled.div`
  ${add_btn}
`;

export const AllowanceForm = styled(Form)``;
