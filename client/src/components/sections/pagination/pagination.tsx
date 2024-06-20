/* eslint-disable react-hooks/exhaustive-deps */
import {
  BottomContainer,
  Paragraph,
  CurrentPageNumber,
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
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { useContext } from "react";
import { PaginationContext } from "../../../contexts/pagination-context";

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
}
function Pagination() {
  const dispatcher = useAppDispatch();
  const { pagination } = useContext(PaginationContext);

  const loadNextPage = async () => {
    if (pagination?.next) {
      dispatcher(loadNextPageRequested(pagination.next));
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
    if (pagination?.prev) {
      dispatcher(loadPrevPageRequested(pagination.prev));
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
          <ButtonName
            onClick={(e) => {
              e.preventDefault();
              loadPrevPage();
            }}
          >
            <MdOutlineKeyboardArrowLeft />
            <ButtonText>Prev</ButtonText>
          </ButtonName>
        </NavButton>
        <NavButton>
          <ButtonName
            onClick={(e) => {
              e.preventDefault();
              loadNextPage();
            }}
          >
            <ButtonText> Next</ButtonText>
            <MdOutlineKeyboardArrowRight />
          </ButtonName>
        </NavButton>
        <Paragraph>Page:</Paragraph>
        <CurrentPageNumber type="number" value={pagination.current_page} />
        <TextContainer>
          <Text>of</Text>
          <Paragraph2> {pagination.total_pages} </Paragraph2>
        </TextContainer>
        <Paragraph>Per Page:</Paragraph>
        <DropDown />
      </BottomContainer>
    </PaginationContainer>
  );
}

export default Pagination;
