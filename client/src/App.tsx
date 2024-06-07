import { useState } from "react";
// import SignUp from "./components/pages/signup/SignUp";
import { darkTheme, lightTheme, Theme } from "./theme/theme";
import { ThemeContext, ThemeProvider } from "styled-components";
import SignUp from "./components/pages/signup/SignUp";
const App = () => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const tggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, tggleTheme }}>
        <ThemeProvider theme={theme}>
          <SignUp />
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
