import { createContext } from "react";

export interface YearMonthPagination {
  month: number | undefined;
  year: number | undefined;
  changeYear: (year: number | undefined) => void;
  changeMonth: (month: number | undefined) => void;
}

export const YearMonthPaginationContext = createContext<YearMonthPagination>({
  month: undefined,
  year: undefined,
  changeYear: () => {},
  changeMonth: () => {},
});
