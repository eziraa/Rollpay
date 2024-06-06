import { useState } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/themeContext";
import { ThemeProvider } from "styled-components";
import { Theme, darkTheme, lightTheme } from "./theme/theme";
import { LoginPage } from "./components/pages/login/login";

function App() {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <LoginPage />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
