import { ThemeProvider, createTheme } from '@mui/material';
import '../../App.css'
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import { useState } from 'react';

function App() {
  function changeDarkMode() {
    setDarkMode(() => {
      if (localStorage.theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');

      localStorage.theme = darkMode ? 'dark' : 'light';

      return !darkMode
  })
  }

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-8">
        <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
      </div>
      <div className="container mx-auto">
        <Catalog />
      </div>
    </ThemeProvider>
  )
}

export default App
