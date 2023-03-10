//Dependencies
import axios from "axios";
import "./App.css";
import * as React from "react";
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
import Login from "./pages/Login"; // TEMP
import Signup from "./pages/Signup"; // TEMP
import SignupAuth0 from "./pages/SignupAuth0";
import LoginAuth0 from "./pages/LoginAuth0";
import { useAuth0 } from "@auth0/auth0-react";

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";
const symbol = "SPY";
const interval = "1day";

const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

function App() {
  //Google user authrntication -- allows redirect to main page if logged in
  const [user, setUser] = useState(null);

  // get user detail from auth0 to check if user is logged in for redirect, you can also use isAuthenticated
  const { user: userAuth0, isLoading } = useAuth0();

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });

      setUser(data.user._json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
        <Header
          check={darkMode}
          change={() => setDarkMode(!darkMode)}
          user={user} // pass user details to header to show user details
        />
        <div id="app">
          {/* Display loading until it's checking if user is logged in */}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Routes>
              <Route
                className="routes-container"
                exact
                path="/"
                element={
                  user || userAuth0 ? <Sectors /> : <Navigate to="/login" />
                }
              />
              <Route
                exact
                path="/login"
                element={
                  user || userAuth0 ? <Navigate to="/" /> : <LoginAuth0 />
                }
              />
              <Route
                path="/signup"
                element={
                  user || userAuth0 ? <Navigate to="/" /> : <SignupAuth0 />
                }
              />

              <Route path="/sector/:sectorSymbol" element={<Sector />} />
              <Route path="/about" element={<About />} />
              <Route path="/sectors" element={<Sectors />} />
              {/* user email parameter need to access and save stocks in the watchlist  for local storage */}
              <Route
                path="/watchlist"
                element={<Watchlist user={user || userAuth0} />}
              />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
