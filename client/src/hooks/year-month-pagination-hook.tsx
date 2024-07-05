import { useContext } from "react";
import { YearMonthPaginationContext } from "../contexts/month-year-pagination";

export const useYearMonthPagination = () =>
  useContext(YearMonthPaginationContext);
