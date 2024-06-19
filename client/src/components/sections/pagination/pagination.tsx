import {
  BottomContainer,
  Paragraph,
  Number,
  Paragraph2,
  ButtonName,
  ButtonText,
  PaginationContainer,
  Text,
  TextContainer,
  NavButton,
} from "./pagination.style";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DropDown from "../../utils/drop-down/drop-down";
import {
  loadNextPageRequested,
  loadPrevPageRequested,
} from "../../../store/employee/employee-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
function Pagination() {
  const dispatcher = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.employee);

  const loadNextPage = async () => {
    if (pagination?.next) {
      dispatcher(loadNextPageRequested(pagination?.next));
    } else
      dispatcher(
        setFlashMessage({
          desc: "No more pages to load",
          type: "error",
          duration: 3,
          status: true,
          title: "Loading next page...",
        })
      );
  };
  const loadPrevPage = async () => {
    if (pagination?.previous) {
      dispatcher(loadPrevPageRequested(pagination?.previous));
    } else
      dispatcher(
        setFlashMessage({
          desc: "No more pages to load",
          type: "error",
          duration: 3,
          status: true,
          title: "Loading previous page...",
        })
      );
  };

  return (
    <PaginationContainer>
      <BottomContainer>
        <NavButton>
          <ButtonName onClick={loadPrevPage}>
            <MdOutlineKeyboardArrowLeft />
            <ButtonText>Prev</ButtonText>
          </ButtonName>
        </NavButton>
        <NavButton>
          <ButtonName onClick={loadNextPage}>
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
    </PaginationContainer>
  );
}

export default Pagination;
