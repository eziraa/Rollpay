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
import { PaginationContext } from "./contexts/pagination-context";
import { usePagination } from "./hooks/use-pagination";
import { DisplayProvider } from "./providers/display-provider";
import { ModalProvider } from "./providers/modal-provider";
import { ModalStore } from "./components/utils/modal-store/modal-store";
import { FilterProvider } from "./providers/filter-provider";
import { ProfileProvider } from "./contexts/profile-context";
import { YearMonthPaginationProvider } from "./providers/year-month-pagination-provider";

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

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <PaginationContext.Provider
          value={{
            ...usePagination(),
          }}
        >
          <FilterProvider>
            <DisplayProvider>
              <ProfileProvider>
                <ModalProvider>
                  <AuthProvider>
                    <YearMonthPaginationProvider>
                      <ThemeProvider theme={theme}>
                        <FlashMessage />
                        <RouterConfig />
                        <ModalStore />
                      </ThemeProvider>
                    </YearMonthPaginationProvider>
                  </AuthProvider>
                </ModalProvider>
              </ProfileProvider>
            </DisplayProvider>
          </FilterProvider>
        </PaginationContext.Provider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
