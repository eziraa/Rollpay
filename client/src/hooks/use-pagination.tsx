import { useState } from "react";
import { PaginationResponse } from "../typo/pagination/response";
import { Pagination } from "../typo/utils/response";

export const usePagination = () => {
  const initialPagination: PaginationResponse = {
    current_page: 1,
    total_pages: 1,
    total: 1,
    per_page: 10,
    prev: undefined,
    next: undefined,
    type: undefined,
  };

  const [page, setPage] = useState<PaginationResponse>(initialPagination);

  const getPath = () => {
    if (page.prev) {
      return new URL(page.prev).pathname;
    } else if (page.next) {
      return new URL(page.next).pathname;
    } else return "";
  };

  const setPageSize = (page_size: number) => {
    const base = getPath();

    const total_pages = page_size > 0 ? Math.ceil(page.total / page_size) : 1;

    const prev = undefined;
    const next =
      total_pages > 1 ? `?page=${2}&page_size=${page_size}` : undefined;
    const type = base.split("/")[0];
    setPage({
      current_page: 1,
      total_pages,
      total: page.total,
      per_page: page_size,
      prev: prev ? base + prev : base,
      next: next ? base + next : base,
      type,
    });
  };

  const setPagination = (pagination: Pagination) => {
    if (pagination.previous) {
      const url = new URL(pagination.previous);
      const current_page = url.searchParams.get("page");
      const page_size = url.searchParams.get("page_size");

      setPage({
        ...page,
        current_page: parseInt(current_page || "1") + 1,
        per_page: parseInt(page_size || "10"),
        prev: pagination.previous,
        next: pagination.next,
        total: pagination.count,
        type: pagination.type,
      });
    } else if (pagination.next) {
      const url = new URL(pagination.next);
      const current_page = parseInt(url.searchParams.get("page") || "2") - 1;
      const page_size = parseInt(url.searchParams.get("page_size") || "10");
      const total_pages = page_size
        ? Math.ceil(pagination.count / page_size)
        : Math.ceil(pagination.count / 10);
      setPage({
        ...page,
        current_page,
        per_page: page_size,
        total_pages,
        prev: pagination.previous,
        next: pagination.next,
        total: pagination.count,
        type: pagination.type,
      });
    }
  };

  return {
    pagination: page,
    setPagination,
    setPageSize,
  };
};
