import {
  getWatchListFromLocalStorage,
  setWatchListToLocalStorage,
} from "../Utilities/toolBelt";
import { redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WatchListSearch from "../WatchListSearch/WatchListSearch";
import { getStocks, getStockPrice } from "../api/api";
import StockCard from "../Stockcard/Stockcard";

function WatchList({ user }) {
  const [watchList, setWatchList] = useState(
    getWatchListFromLocalStorage(user?.email)
  );
  const [stockSymbols, setStockSymbols] = useState();
  const [stocksData, setStocksData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      return navigate("/");
    }
    getStocks().then((response) => {
      const stocks = response.data.data;
      setStockSymbols(stocks);
    });
  }, []);

  useEffect(() => {
    const stockSymbolsString = watchList.join(", ");
    if (stockSymbolsString) {
      getStockPrice(stockSymbolsString)
        .then((res) => {
          setStocksData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [watchList]);

  const addToWatchList = (symbol) => {
    // check to see whether or not this symbol is already in the users watchlist
    const symbolIsInWatchList = watchList.includes(symbol);
    if (!symbolIsInWatchList) {
      // we add the symbol to watchList
      const newWatchList = [...watchList, symbol];
      setWatchList(newWatchList);
      setWatchListToLocalStorage(user.email, newWatchList);
    } else {
      // we need some way to notify the user...
      alert(`${symbol} is already in your watchlist!`);
    }
  };

  const renderStockCards = () => {
    // setup an array to hold the react components, initialize as empty array
    const stockCards = [];

    // for in loop over stockData to loop since API data is returned as an OBJECT
    for (let stockKey in stocksData) {
      const stockData = stocksData[stockKey];
      // for each stock Object, push a StockCard component into the array
      stockCards.push(<StockCard key={stockData.name} stock={stockData} />);
      // passing in the stock object as props
    }

    // return array
    return stockCards;
  };

  return (
    <>
      {user?.email ? (
        <div>
          <WatchListSearch
            addToWatchList={addToWatchList}
            stockSymbols={stockSymbols}
          />

          <section className="watchlist">
            {stocksData ? (
              <div className="cards-parent">
                {/* markup for a parent container */}
                {renderStockCards()}
                {/* markup for a parent container */}
              </div>
            ) : (
              <p>No stocks added to watchlist.</p>
            )}
          </section>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

export default WatchList;
