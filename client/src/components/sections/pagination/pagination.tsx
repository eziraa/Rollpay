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
  const [page, setPage] = useState<PageInfo>({
    currentPage: 0,
    totalPages: 0,
    totalRecords: 0,
    pageSize: 0,
  });
  const getPageInfo = (prev: string) => {
    prev = prev.trim().slice(-1);
    if (prev) {
      setPage({
        currentPage: Number.parseInt(prev.toString()),
        totalPages: Math.round(pagination?.count ? pagination.count / 10 : 0),
        totalRecords: pagination?.count ?? 0,
        pageSize: 10,
      });
    } else {
      setPage({
        currentPage: 1,
        totalPages: pagination?.count ? pagination.count / 10 : 0,
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
        <CurrentPageNumber type="number" value={page.currentPage} />
        <TextContainer>
          <Text>of</Text>
          <Paragraph2> {page.totalPages} </Paragraph2>
        </TextContainer>
        <Paragraph>Per Page:</Paragraph>
        <DropDown selected={page.pageSize} />
      </BottomContainer>
    </PaginationContainer>
  );
}

export default Pagination;
