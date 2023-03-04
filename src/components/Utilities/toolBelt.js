//this disaster of code below was an attempt at only showing tow decimals for the incoming API data

const formatQuoteData = (quotesObject) => {
  const formattedQuotesObject = { ...quotesObject };
  for (let stockKey in formattedQuotesObject) {
    const stockObject = formattedQuotesObject[stockKey];
    for (let stockProperty in stockObject) {
      let stockPropertyValue = stockObject[stockProperty];
      if (typeof stockPropertyValue === "string") {
        const valueIsFloat = stockPropertyValue.search(/\-?\d+\.\d+/);

        if (valueIsFloat !== -1 && !Number.isNaN(Number(stockPropertyValue))) {
          // it is a float, like 3.14, etc.
          // turn it into a number, with a twoFixed of 2 decimal points
          formattedQuotesObject[stockKey][stockProperty] =
            Number(stockPropertyValue).toFixed(2);
        }
      }
    }
  }
  return formattedQuotesObject;
};

//color coding logic

const momentumStatuses = {
  POSITIVE: "POSITIVE",
  NEUTRAL: "NEUTRAL",
  NEGATIVE: "NEGATIVE",
};

const getIndicatorMomentum = (ema8Day, ema21Day, ppoData) => {
  const fastOverSlow = ema8Day.ema > ema21Day.ema;
  const ppoAbove1 = ppoData.ppo > 1;

  let momentumStatus = "";
  if (fastOverSlow && ppoAbove1) {
    // "positive" momentum
    momentumStatus = momentumStatuses.POSITIVE;
  } else if (!fastOverSlow && !ppoAbove1) {
    // "negative" momentum
    momentumStatus = momentumStatuses.NEGATIVE;
  } else {
    // fastOverSlow && !ppoAbove1 OR !fastOverSlow && ppoAbove1
    // "neutral" momentum
    momentumStatus = momentumStatuses.NEUTRAL;
  }

  return momentumStatus;
};

// localStorage API stuff
// DOCS: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

const getWatchListFromLocalStorage = (key) => {
  // watchlist will be an array of stock symbols ['SPY', 'AAPL'].. etc.
  // when SAVING a javascript array to local storage, it gets crunched down
  // into a comma separated string
  // ['SPY', 'AAPL'] => "SPY, AAPL"
  // use .split(',') to get it to turn back into an array
  const localStorageData = localStorage.getItem(key);
  if (localStorageData === null) {
    return [];
  }
  // assuming at this point there is SOMETHING
  // Can split that value based on commas, and return that array
  const localStorageDataArray = localStorageData.split(",");

  return localStorageDataArray;
};

const setWatchListToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export {
  formatQuoteData,
  getIndicatorMomentum,
  momentumStatuses,
  getWatchListFromLocalStorage,
  setWatchListToLocalStorage,
};
