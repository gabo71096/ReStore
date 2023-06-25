import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "../../App.css";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState } from "react";

function App() {
  function changeDarkMode() {
    setDarkMode(!darkMode);
  }

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
