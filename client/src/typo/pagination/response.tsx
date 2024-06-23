export interface PaginationResponse {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  prev: string | undefined;
  next: string | undefined;
}
