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
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from "./components/pages/main/main";
import { LoginPage } from "./components/pages/login/login";
import { ChangePassword } from "./components/pages/change-password/change-password";
import SignUp from "./components/pages/sign-up/sign-up";
import NotFoundPage from "./components/pages/4_0_4/404";
import AccessDenied from "./components/pages/access-denied/access-denied";
import { useAuth } from "./hooks/auth-hook";

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
  const { routers } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [...routers],
    },
    { path: "login", element: <LoginPage /> },
    { path: "sign-up", element: <SignUp /> },
    { path: "change-password", element: <ChangePassword /> },
    { path: "404", element: <NotFoundPage /> },
    { path: "access-denied", element: <AccessDenied /> },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
  return (
    <NavigationProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <PaginationContext.Provider
          value={{
            ...usePagination(),
          }}
        >
          <FilterProvider>
            <RefsProvider>
              <DisplayProvider>
                <ProfileProvider>
                  <ModalProvider>
                    <YearMonthPaginationProvider>
                      <ThemeProvider theme={theme}>
                        <FlashMessage />
                        <RouterProvider router={router} />
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
