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
import { useAppDispatch } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { useEffect, useState } from "react";
import { loadNextEmployeeListPage } from "../../../store/employee/employee-slice";
import { loadNextPaymentListPage } from "../../../store/salary/salary-slice";
import { Pagination as PaginationInterface } from "../../../typo/utils/response";
import DropDown from "../../utils/drop-down/drop-down";

function Pagination({ pagination }: { pagination: PaginationInterface }) {
  const dispatcher = useAppDispatch();
  const [pageNumber, setPageNumber] = useState<number>(pagination.current_page);

  const loadNextPage = async () => {
    if (pagination?.next) {
      pagination.type === "employee" &&
        dispatcher(loadNextEmployeeListPage(pagination.next));
      pagination.type === "salary" &&
        dispatcher(loadNextPaymentListPage(pagination.next));
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
      pagination.type === "employee" &&
        dispatcher(loadNextEmployeeListPage(pagination.previous));
      pagination.type === "salary" &&
        dispatcher(loadNextPaymentListPage(pagination.previous));
    } else
      dispatcher(
        setFlashMessage({
          desc: "No more pages to load",
          type: "error",
          duration: 3,
          status: true,
          title: "Loading prev page...",
        })
      );
  };

  const loadPage = (page: number) => {
    if (page) {
      if (page < 1) {
        dispatcher(
          setFlashMessage({
            desc: "Page number out of range",
            type: "error",
            duration: 3,
            status: true,
            title: "Invalid page number",
          })
        );
      }
      if (page > pagination.number_of_pages) {
        dispatcher(
          setFlashMessage({
            desc: "Page number out of range",
            type: "error",
            duration: 3,
            status: true,
            title: "Invalid page number",
          })
        );
      } else {
        let base_url;
        if (pagination.previous) base_url = pagination.previous;
        else if (pagination.next) base_url = pagination.next;
        if (base_url) {
          const url = new URL(base_url);
          dispatcher(
            loadNextEmployeeListPage(
              url.pathname + `?page=${page}&page_size=${pagination.page_size}`
            )
          );
        }
      }
    }
  };

  useEffect(() => {
    setPageNumber(pagination.current_page);
  }, [pagination.current_page]);
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
        <Paragraph>Page:</Paragraph>
        <CurrentPageNumber
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const value = parseInt(e.currentTarget.value);
            setPageNumber(value);
            loadPage(value);
          }}
          type="number"
          value={pageNumber}
          min={pagination.current_page ? 1 : 0}
          max={pagination.number_of_pages}
        />
        <TextContainer>
          <Text>of</Text>
          <Paragraph2> {pagination.number_of_pages} </Paragraph2>
        </TextContainer>
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

        <Paragraph>Per Page:</Paragraph>
        <DropDown pagination={pagination} />
      </BottomContainer>
    </PaginationContainer>
  );
}

export default Pagination;
