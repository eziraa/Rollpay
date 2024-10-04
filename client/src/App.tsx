import { useState } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/theme-context";
import { ThemeProvider } from "styled-components";
import { Theme, darkTheme, lightTheme } from "./theme/theme";
import { FlashMessage } from "./components/utils/flash-message/flash-message";
import { PaginationContext } from "./contexts/pagination-context";
import { usePagination } from "./hooks/use-pagination";
import { DisplayProvider } from "./providers/display-provider";
import { ModalProvider } from "./providers/modal-provider";
import { ModalStore } from "./components/utils/modal-store/modal-store";
import { FilterProvider } from "./providers/filter-provider";
import { ProfileProvider } from "./contexts/profile-context";
import { YearMonthPaginationProvider } from "./providers/year-month-pagination-provider";
import { RefsProvider } from "./providers/refs-provider";
import { NavigationProvider } from "./providers/navigation-provider";
import AppRouter from "./AppRouter";

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

  const pagination = usePagination();

  return (
    <NavigationProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <PaginationContext.Provider value={{ ...pagination }}>
          <FilterProvider>
            <RefsProvider>
              <DisplayProvider>
                <ProfileProvider>
                  <ModalProvider>
                    <YearMonthPaginationProvider>
                      <ThemeProvider theme={theme}>
                        <FlashMessage />
                        <AppRouter />
                        <ModalStore />
                      </ThemeProvider>
                    </YearMonthPaginationProvider>
                  </ModalProvider>
                </ProfileProvider>
              </DisplayProvider>
            </RefsProvider>
          </FilterProvider>
        </PaginationContext.Provider>
      </ThemeContext.Provider>
    </NavigationProvider>
  );
}

export default App;
