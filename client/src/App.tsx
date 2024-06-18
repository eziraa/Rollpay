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
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <FlashMessage />
            <RouterConfig />
          </ThemeProvider>
        </AuthProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
