import { useState } from "react";
import "./watchListSearch.scss"; 



function WatchListSearch({ addToWatchList, stockSymbols }) {
  const [status, setStatus] = useState({type: "", message: ""});

  //this provides values for the drop down menu in the searchbar
  const renderSymbolOptions = () => {
    return stockSymbols.map((stock) => (
      <option key={stock.symbol} value={stock.symbol} />
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    // sanitize the users input, so they can type garbage that wont break the system
    // "     aApL    " => "AAPL"
    const stockSymbolToAdd = data.get("watchlist-search").trim().toUpperCase();
    // sanitized data means we are able to use strict equality, reduces uncertainty of our application
    const stockSymbolExists = stockSymbols.find(stock => stock.symbol === stockSymbolToAdd)
    if (stockSymbolExists) {
      // call another function which we write in WatchList.js and pass down as props
      addToWatchList(stockSymbolToAdd)
      // it only initiates this call to update state and retrieve new API data if the stock symbol exists

    } else {
      // setStatus({type: "error", message: `${stockSymbolToAdd} does not exist.`});
      alert(`${stockSymbolToAdd} does not exist!`);
    }
  };

  return (
    <div >
      <h1>Watchlist</h1>
      {stockSymbols ? (
        <div>
          <form onSubmit={handleSubmit} className="watch-list-add">
            <input
              list="watchstocklist"
              className="watchlist-search"
              name="watchlist-search"
              type="text"
              placeholder="Enter a stock symbol..."
            />
            {/* auto complete for watchlist search */}
            <datalist id="watchstocklist">{renderSymbolOptions()}</datalist>
            <button className="watchlist_button" type="submit">ADD</button>
            {status && <p className={status.type}>{status.message}</p>}
          </form>
        </div>
      ) : (
        <div>
          <input
            className="watchlist-search"
            disabled
            type="text"
            placeholder="loading"
          />
        </div>
      )}
    </div>
  );
}

export default WatchListSearch;
