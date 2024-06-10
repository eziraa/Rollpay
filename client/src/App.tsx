import { useState } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/themeContext";
import { ThemeProvider } from "styled-components";
import { Theme, darkTheme, lightTheme } from "./theme/theme";
import { Provider } from "react-redux";
import { store } from "./utils";
import { RouterConfig } from "./config/router/router";
import { FlashMessage } from "./components/utils/flash_message/flash_message";
import { AuthProvider } from "./contexts/authContext";

function App() {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const toggleTheme = () => {
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
