import axios from "axios";

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";

function getStocks() {
  const stockSymbols = `https://api.twelvedata.com/stocks?country="United States"`
  return axios.get(stockSymbols);
}

function getStockPrice(symbols) {
  const sectorsQuote = `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${apiKey}&format=JSON`;
  return axios.get(sectorsQuote);
}

const getStockEMA = (symbol, timePeriod, interval = "1day") => {
  const emaQuery = `https://api.twelvedata.com/ema?symbol=${symbol}&interval=${interval}&time_period=${timePeriod}&apikey=${apiKey}`;
  return axios.get(emaQuery);
};

const getStockPPO = (symbol, interval) => {
  const ppoQuery = `https://api.twelvedata.com/ppo?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
  return axios.get(ppoQuery);
};

const getStockTechnicalAlignment = (symbol, interval = "1day") => {
  const Ema8Day = getStockEMA(symbol, "8", interval).then(
    (response) => response.data
  );

  const Ema8Day2Hour = getStockEMA(symbol, "8", "2h").then(
    (response) => response.data
  );

  const Ema21Day = getStockEMA(symbol, "21", interval).then(
    (response) => response.data
  );

  const Ema21Day2Hour = getStockEMA(symbol, "21", "2h").then(
    (response) => response.data
  );

  const ppoData1Day = getStockPPO(symbol, interval).then((response) => {
    return response.data;
  });

  const ppoData2Hour = getStockPPO(symbol, "2h").then((response) => {
    return response.data;
  });

  return Promise.all([
    Ema8Day,
    Ema8Day2Hour,
    Ema21Day,
    Ema21Day2Hour,
    ppoData1Day,
    ppoData2Hour,
  ]);
};

//short term momentum api calls

const shortTermEMA = (symbol, interval = "2h") => {
  const shortEMAQuery = `https://api.twelvedata.com/ema?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
  return axios.get(shortEMAQuery);
};

const shortTermPPO = (symbol, interval = "2h") => {
  const shortPPOQuery = `https://api.twelvedata.com/ppo?symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
  return axios.get(shortPPOQuery);
};

const shortTermlAlignment = (symbol, interval = "2h") => {
  const shortTerm8EMA = shortTermEMA(symbol, "8", interval).then(
    (response) => response.data
  );

  const shortTerm21EMA = shortTermEMA(symbol, "21", interval).then(
    (response) => response.data
  );

  const shortPPOData = shortTermPPO(symbol, interval).then((response) => {
    return response.data;
  });

  return Promise.all([shortTerm8EMA, shortTerm21EMA, shortPPOData]);
};

export {
  getStockPrice,
  getStockTechnicalAlignment,
  getStockPPO,
  shortTermlAlignment,
  getStocks
};
