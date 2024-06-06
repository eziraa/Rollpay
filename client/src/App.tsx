import { useContext } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/themeContext";
import { ThemeProvider } from "styled-components";
import { Header } from "./components/sections/header/header";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
