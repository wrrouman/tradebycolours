//Dependencies
import axios from "axios";
import "./App.css";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/slice/user";
import { createContext, useState, useEffect } from "react";
import { ThemeContext } from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
//Impoted Components
import Header from "./components/Header/Header";
import Sectors from "./components/Sectors/sectors";
import Sector from "./components/Sector/sector";
import About from "./components/About/About";
import Watchlist from "./components/Watchlist/Watchlist";

//Authorrization
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";
const symbol = "SPY";
const interval = "1day";

const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

function App() {
  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const dispatch = useDispatch();
  const user = useSelector((state) => state)
  console.log("CALL", user);

  useEffect(() => {
    dispatch(fetchUser()).then((x) => {
      console.log(x);
    });
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header check={darkMode} change={() => setDarkMode(!darkMode)} />
        <Routes>
          {/* <div className="container">
            <Route
              exact
              path="/"
              element={user ? <Home user={user} /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </div> */}

          <Route path="/sector/:sectorSymbol" element={<Sector />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Sectors />} />
          {/* <Route path="/watchlist" element={<Watchlist/>}/> */}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
