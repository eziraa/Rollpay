export interface BaseResponse {
  error: string;
  code: number;
  success: string;
}
export interface Pagination {
  next: string | undefined;
  previous: string | undefined;
  count: number;
  page_size: number;
  current_page: number;
  number_of_pages: number;
}

export interface PaginatedResponse extends BaseResponse {
  count: number;
  pagination: Pagination;
}

export interface PaginatedBackEndResponse {
  count: number;
  next: string | null;
  previous: string | null;
  status: number;
}
