import {
  BottomContainer,
  Paragraph,
  Number,
  Paragraph2,
  ButtonName,
  ButtonText,
  TableFooterContainer,
  Text,
  TextContainer,
  NavButton
} from "./table_footer.style";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DropDown from "../../utils/dropdown/drop_down";
function TableFooter() {
  return (
    <TableFooterContainer>
      <BottomContainer>
        <NavButton>
          <ButtonName>
            <MdOutlineKeyboardArrowLeft />
            <ButtonText>Prev</ButtonText>
          </ButtonName>
        </NavButton>
        <NavButton>
          <ButtonName>
            <ButtonText> Next</ButtonText>
            <MdOutlineKeyboardArrowRight />
          </ButtonName>
        </NavButton>
        <Paragraph>Page:</Paragraph>
        <Number type="number" />
        <TextContainer>
          <Text>of</Text>
          <Paragraph2> 100</Paragraph2>
        </TextContainer>
        <Paragraph>Per Page:</Paragraph>
        <DropDown />
      </BottomContainer>
    </TableFooterContainer>
  );
}

export default TableFooter;
