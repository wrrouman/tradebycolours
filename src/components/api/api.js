import axios from "axios";

const apiKey = "0f94898a0e174bf3ab5fe7600a1ba572";
const symbol = "SPY, XLK, XLV, XLF, XLC, XLI, XLB, XLY, XRT, SMH, XLE, XLP ";
const sectorsQuote = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}&format=JSON`;
// const sectorsQuote =`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}`

function getStockPrice() {
  //   axios.request(sectorsQuote).then(function (response) {
  //       console.log(response.data);
  //   }).catch(function (error) {
  //       console.error(error);
  //   });

  return axios.get(sectorsQuote);
}

// get EMA technical indicator data, getEmaData(symbol, time_period)
// EMA data
// time_period fast 10 days slow 20 days
// getEmaData('AAPL', '10')
// getEmaData('AAPL', '20')

const getStockTechnicalAlignment = (symbol, interval = "1day") => {
  const Ema10Day = getStockEMA(symbol, "10", interval).then(response => response.data);
  const Ema20Day = getStockEMA(symbol, "20", interval).then(response => response.data);
  // const ppoData = getStockPpo(symbol, ppoParams, interval)
  return Promise.all([Ema10Day, Ema20Day]);
  // return Promise.all([Ema10Day, Ema20Day, ppoData])
};

// getStockEMA is our "helper" function that can be used to obtain the 10, and 20 day
// as well as other custom intervals if desired, but defaults to 1day interval.
const getStockEMA = (symbol, timePeriod, interval = "1day") => {
  const emaQuery = `https://api.twelvedata.com/ema?symbol=${symbol}&interval=${interval}&time_period=${timePeriod}&apikey=${apiKey}`;
  return axios.get(emaQuery);
};

// const ppoQuery = `https://api.twelvedata.com/ppo?symbol=AAPL&interval=1min&apikey=${}`

// get PPO technical indicator data, getEmaData(symbol, interval)
// getPpoData('AAPL')

// get time_series info for 11 ETF's & S&P 500
// store an array of those tickers
// we would make the 12 calls for those ETF's
// "https://api.twelvedata.com/time_series
// ?apikey=0f94898a0e174bf3ab5fe7600a1ba572
// &interval=1day
// &symbol=SPY
// &start_date=2023-01-02 15:46:00
// &end_date=2023-01-15 15:46:00
// &format=JSON"

// getTimeSeries(symbol)

// export {}

// limit the amount of calls, so we only make a max of 1 call per calendar day

// caching

// simple storage

// ['AAPL', 'GOOG']

// advanced storage

// each Ticker ('AAPL')
// its stock data
// technical indicator data
// last updated timestamp

// create another utils file call it database.js to help with managing things in localStorage

export { getStockPrice, getStockTechnicalAlignment };
