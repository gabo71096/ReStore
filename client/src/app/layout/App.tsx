import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import "../../App.css";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponents from "./LoadingComponents";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";

function App() {
  function changeDarkMode() {
    setDarkMode(!darkMode);
  }

  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar position="bottom-right" theme="colored"></ToastContainer>
      <CssBaseline />
      <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
      {loading ? (
        <LoadingComponents message="Initializing app..." />
      ) : location.pathname === "/" ? (
        <HomePage />
      ) : (
        <Container sx={{ mt: 4 }}>
          <Outlet />
        </Container>
      )}
    </ThemeProvider>
  );
}

export default App;
