export interface CustomResponse {
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


