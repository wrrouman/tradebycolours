import axios from "axios";
import { getFromCache, saveToCache } from "../Utilities/cache";

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";

// API call for list of all US stock tickers 
function getStocks() {
  const stockSymbols = `https://api.twelvedata.com/stocks?country="United States`;
  return axios.get(stockSymbols);
}


//API call for individual stock price
function getStockPrice(symbols) {
  const sectorsQuote = `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${apiKey}&format=JSON`;
  return axios.get(sectorsQuote);
}

//API call for the moving average indicator 
const getStockEMA = async (symbol, timePeriod, interval = "1day") => {
  // The URL constructor will make it less error prone url object, containing all of our searchParams
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/URL

  const baseUrl = "https://api.twelvedata.com/ema";
  const emaQuery = new URL(baseUrl);
  emaQuery.searchParams.append("symbol", symbol);
  emaQuery.searchParams.append("interval", interval);
  emaQuery.searchParams.append("time_period", timePeriod);
  emaQuery.searchParams.append("apikey", apiKey);

  const emaUrl = emaQuery.toString(); // this outputs https://api.twelvedata.com/ema?symbol=... etc.
  const cachedResponse = await getFromCache("indicators", emaUrl);
  // by using this await.. the rest of the lines below will be blocked until getFromCache resolves
  // once it has resolved.. uses the truthiness of the returned value
  // as it will either be cached data.. or null
  // to decide whether or not to reach out to the twelvedata API for fresh data
  if (cachedResponse) {
    // if there is already fresh data.. skips axios altogether and return what was in the cache
    return cachedResponse;
  } else {
    const response = await axios.get(emaUrl);
    const data = response.data;
    saveToCache("indicators", emaUrl, data);
    return data;
  }
};

//API call for the Price Percentage Oscillator indicator, PPO for short
const getStockPPO = async (symbol, interval) => {
  const baseUrl = "https://api.twelvedata.com/ppo";
  const ppoQuery = new URL(baseUrl);
  ppoQuery.searchParams.append("symbol", symbol);
  ppoQuery.searchParams.append("interval", interval);
  ppoQuery.searchParams.append("apikey", apiKey);
  const ppoUrl = ppoQuery.toString();
  const cachedResponse = await getFromCache("indicators", ppoUrl);

  if (cachedResponse) {
    return cachedResponse;
  } else {
    const response = await axios.get(ppoUrl);
    const data = response.data;

    saveToCache("indicators", ppoUrl, data);
    return data;
  }
};

// A single Promice packaging all the indictor calls togeather for multiple timeframes 
const getStockTechnicalAlignment = (symbol, interval = "1day") => {
  // no need for .then chains here, as getStockEMA and getStockPPO are refactored to be async
  // all 6 of these variables are now Promises.. that when resolved will contain only the data
  // either: from the cache, or the API
  const Ema8Day = getStockEMA(symbol, "8", interval);
  const Ema8Day2Hour = getStockEMA(symbol, "8", "2h");
  const Ema21Day = getStockEMA(symbol, "21", interval);
  const Ema21Day2Hour = getStockEMA(symbol, "21", "2h");
  const ppoData1Day = getStockPPO(symbol, interval);
  const ppoData2Hour = getStockPPO(symbol, "2h");

  return Promise.all([
    Ema8Day,
    Ema8Day2Hour,
    Ema21Day,
    Ema21Day2Hour,
    ppoData1Day,
    ppoData2Hour,
  ]);
};

export { getStockPrice, getStockTechnicalAlignment, getStockPPO, getStocks };
