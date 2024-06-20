import { useState } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/theme-context";
import { ThemeProvider } from "styled-components";
import { Theme, darkTheme, lightTheme } from "./theme/theme";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import { RouterConfig } from "./config/router/router";
import { FlashMessage } from "./components/utils/flash-message/flash-message";
import { AuthProvider } from "./contexts/auth-context";
import { PaginationResponse } from "./typo/pagination/response";
import { PaginationContext } from "./contexts/pagination-context";
import { Pagination } from "./services/employee-api";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState<Theme>(
    current_theme == "dark_theme" ? darkTheme : lightTheme
  );
  const toggleTheme = () => {
    localStorage.setItem(
      "current_theme",
      theme === lightTheme ? "dark_theme" : "light_theme"
    );
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const initialPagination: PaginationResponse = {
    current_page: 1,
    total_pages: 1,
    total: 1,
    per_page: 1,
    prev: undefined,
    next: undefined,
  };

  const [page, setPage] = useState<PaginationResponse>(initialPagination);

  const setPageSize = (page_size: number) => {
    const base = "/employee/list";

    const total_pages = page_size > 0 ? Math.ceil(page.total / page_size) : 1;

    const prev = undefined;
    const next =
      total_pages > 1 ? `?page=${2}&page_size=${page_size}` : undefined;
    setPage({
      current_page: 1,
      total_pages,
      total: page.total,
      per_page: page_size,
      prev: prev ? base + prev : base,
      next: next ? base + next : base,
    });
  };

  const setPagination = (pagination: Pagination) => {
    if (pagination.previous) {
      const url = new URL(pagination.previous);
      const current_page = url.searchParams.get("page");
      const page_size = url.searchParams.get("page_size");
      setPage({
        ...page,
        current_page: parseInt(current_page || "0") + 1,
        per_page: parseInt(page_size || "10"),
        prev: pagination.previous,
        next: pagination.next,
        total: pagination.count,
      });
      return;
    } else if (pagination.next) {
      const url = new URL(pagination.next);
      const current_page = parseInt(url.searchParams.get("page") || "2") - 1;
      const page_size = parseInt(url.searchParams.get("page_size") || "10");
      const total_pages = page_size > 0 ? Math.ceil(page.total / page_size) : 1;
      setPage({
        ...page,
        current_page,
        per_page: page_size,
        total_pages,
        prev: pagination.previous,
        next: pagination.next,
        total: pagination.count,
      });
    }
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <PaginationContext.Provider
          value={{
            pagination: page,
            setPagination,
            setPageSize,
          }}
        >
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <FlashMessage />
              <RouterConfig />
            </ThemeProvider>
          </AuthProvider>
        </PaginationContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
