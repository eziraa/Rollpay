import { createContext } from "react";

export interface YearMonthPagination {
  month: number;
  year: number;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
}

export const YearMonthPaginationContext = createContext<YearMonthPagination>({
  month: 1,
  year: 1,
  changeYear: () => {},
  changeMonth: () => {},
});
