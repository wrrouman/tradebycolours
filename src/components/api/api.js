import axios from "axios";

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";
const symbol = "SPY, AAPL, MSFT, UNG, AMZN, CAT, DE";
const sectorsQuote = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}&format=JSON`;
const getLogo = `https://api.twelvedata.com/logo?symbol=${symbol}&apikey=0f94898a0e174bf3ab5fe7600a1ba572`;
// const sectorsQuote =`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}`
const ppoQuery = `https://api.twelvedata.com/ppo?symbol=${symbol}&interval=1day&apikey=${apiKey}`;

function getStockPrice() {
  return axios.get(sectorsQuote);
}

function stockLogo() {
  return axios.get(getLogo);
}

function ppoStock() {
  return axios.get(ppoQuery);
}

const getStockEMA = (symbol, timePeriod, interval = "1day") => {
  const emaQuery = `https://api.twelvedata.com/ema?symbol=${symbol}&interval=${interval}&time_period=${timePeriod}&apikey=${apiKey}`;
  return axios.get(emaQuery);
};

const getStockTechnicalAlignment = (symbol, interval = "1day") => {
  const Ema8Day = getStockEMA(symbol, "8", interval).then(
    (response) => response.data
  );
  const Ema13Day = getStockEMA(symbol, "13", interval).then(
    (response) => response.data
  );
  const Ema21Day = getStockEMA(symbol, "21", interval).then(
    (response) => response.data
  );

  // const ppoData = ppoStock().then((response) => Object.entries(response.data));

  // const ppoData = getStockPpo(symbol, ppoParams, interval)
  return Promise.all([Ema8Day, Ema13Day, Ema21Day]);
  // return Promise.all([Ema10Day, Ema20Day, ppoData])
};

export { getStockPrice, getStockTechnicalAlignment, stockLogo, ppoStock };
