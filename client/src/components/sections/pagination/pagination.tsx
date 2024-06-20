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
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { setFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { useEffect, useState } from "react";

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
}
function Pagination() {
  const dispatcher = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.employee);

  const loadNextPage = async () => {
    if (pagination?.next) {
      if (pagination.next.includes("page_size=")) {
        const url = pagination.next.substring(
          0,
          pagination.next.indexOf("&page_size=")
        );
        if (url.length > 0)
          dispatcher(
            loadPrevPageRequested(url + `&page_size=${pagination.page_size}`)
          );
      } else
        dispatcher(
          loadNextPageRequested(
            pagination?.next + `&page_size=${pagination.page_size}`
          )
        );
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
      if (pagination.previous.includes("page_size=")) {
        const url = pagination.previous.substring(
          0,
          pagination.previous.indexOf("&page_size=")
        );
        if (url.length > 0)
          dispatcher(
            loadPrevPageRequested(url + `&page_size=${pagination.page_size}`)
          );
      }
      dispatcher(
        loadPrevPageRequested(
          pagination.previous + `&page_size=${pagination.page_size}`
        )
      );
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
  const [page, setPage] = useState<PageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecords: 0,
    pageSize: 0,
  });
  const getPageInfo = (prev: string) => {
    if (prev.includes("page=")) {
      prev = prev.substring(prev.indexOf("page=") + 5, prev.indexOf("&"));
      console.log(prev);
      setPage({
        currentPage: Number.parseFloat(prev) + 1,
        totalPages:
          Math.floor(pagination ? pagination.count / pagination.page_size : 0) +
          1,
        totalRecords: pagination?.count ?? 0,
        pageSize: 10,
      });
    } else if (pagination?.next?.includes("page=")) {
      prev = pagination?.next?.substring(
        pagination?.next?.indexOf("page=") + 5,
        pagination?.next?.indexOf("&")
      );
      setPage({
        currentPage: Number.parseFloat(prev),
        totalPages:
          Math.floor(pagination ? pagination.count / pagination.page_size : 0) +
          1,
        totalRecords: pagination?.count ?? 0,
        pageSize: 10,
      });
    } else {
      setPage({
        currentPage: page.currentPage + 1,
        totalPages:
          Math.floor(pagination ? pagination.count / pagination.page_size : 0) +
          1,
        totalRecords: pagination?.count ?? 0,
        pageSize: 10,
      });
    }
  };

  useEffect(() => {
    getPageInfo(pagination?.previous ?? "");
  }, [pagination]);

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
        <CurrentPageNumber type="number" value={pagination?.current_page} />
        <TextContainer>
          <Text>of</Text>
          <Paragraph2> {pagination?.number_of_pages} </Paragraph2>
        </TextContainer>
        <Paragraph>Per Page:</Paragraph>
        <DropDown />
      </BottomContainer>
    </PaginationContainer>
  );
}

export default Pagination;
