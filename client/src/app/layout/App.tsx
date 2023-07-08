import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "../../App.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  function changeDarkMode() {
    setDarkMode(!darkMode);
  }

  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  if (loading) return <LoadingComponents message="Initializing app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar position="bottom-right" theme="colored"></ToastContainer>
      <CssBaseline />
      <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
