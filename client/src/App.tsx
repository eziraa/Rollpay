import { useContext, useState } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/themeContext";
import { ThemeProvider } from "styled-components";
import { Header } from "./components/sections/header/header";
import { Theme, darkTheme, lightTheme } from "./theme/theme";

function App() {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
