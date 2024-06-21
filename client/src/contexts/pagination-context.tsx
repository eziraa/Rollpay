import { createContext } from "react";
import { PaginationResponse } from "../typo/pagination/response";
import { Pagination } from "../services/employee-api";

export interface PaginationContextType {
  pagination: PaginationResponse;
  setPagination: (pagination: Pagination) => void;
  setPageSize: (page_size: number) => void;
}

export const PaginationContext = createContext<PaginationContextType>({
  pagination: {
    current_page: 1,
    total_pages: 1,
    total: 1,
    per_page: 10,
    prev: undefined,
    next: undefined,
  },
  setPagination: () => {},
  setPageSize: () => {},
});
