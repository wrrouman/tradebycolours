//Dependencies
import axios from "axios";
import "./App.css";
import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { ThemeContext } from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
//Impoted Components
import Header from "./components/Header/Header";
import Sectors from "./components/Sectors/sectors";
import About from "./components/About/About";
import Watchlist from "./components/Watchlist/Watchlist";

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";
const symbol = "SPY";
const interval = "1day";

const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <CssBaseline />
          <Header check={darkMode} change={() => setDarkMode(!darkMode)} />
          <Routes>
            <Route path="/" element={<Sectors />} />
            <Route path="/about" element={<About />} />

            {/* <Route path="/watchlist" element={<Watchlist/>}/> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
