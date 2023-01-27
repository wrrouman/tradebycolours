// import { getStockPrice } from "./utils/apiCall";
// import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import axios from "axios";
import "./App.css";
import { createContext, useState } from "react";
import { ThemeContext } from "./components/Header/Header";
// const api = "https://api.twelvedata.com/quote?symbol=spx&apikey=0f94898a0e174bf3ab5fe7600a1ba572"

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";
const symbol = "SPY";
const interval = "1day";

const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

function App() {
  return (
    <>
      <Header />
      <div>
        <h1>This is working </h1>
      </div>
    </>
  );
}

export default App;
