//Dependencies
import axios from "axios";
import "./App.css";
import { createContext, useState, useEffect } from "react";
import { ThemeContext } from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";


//Impoted Components
import Header from "./components/Header/Header";
import Sectors from "./components/Sectors/sectors";
import About from "./components/About/About";
import Watchlist from "./components/Watchlist/Watchlist"



const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";
const symbol = "SPY";
const interval = "1day";

const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Sectors />} />
          <Route path="/about" element={<About />} />
          
          {/* <Route path="/watchlist" element={<Watchlist/>}/> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
