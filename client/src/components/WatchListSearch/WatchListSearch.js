import { useState } from "react";

function WatchListSearch({ addToWatchList, stockSymbols }) {
  const [status, setStatus] = useState({type: "", message: ""});
  const renderSymbolOptions = () => {
    return stockSymbols.map((stock) => (
      <option key={stock.symbol} value={stock.symbol} />
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const stockSymbolToAdd = data.get("watchlist-search").trim().toUpperCase();
    const stockSymbolExists = stockSymbols.find(stock => stock.symbol === stockSymbolToAdd)
    if (stockSymbolExists) {
      // call another function which we write in WatchList.js and pass down as props
      addToWatchList(stockSymbolToAdd)
    } else {
      setStatus({type: "error", message: `${stockSymbolToAdd} does not exist.`});
    }
  };

  return (
    <div>
      {stockSymbols ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              list="watchstocklist"
              className="watchlist-search"
              name="watchlist-search"
              type="text"
              placeholder="enter a stock symbol..."
            />
            <datalist id="watchstocklist">{renderSymbolOptions()}</datalist>
            <button type="submit">ADD</button>
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