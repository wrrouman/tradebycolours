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
    // if the user is not logged in, user.email doesn't exist
    // ?. operator => nullish coalescing operator
    //  if the value is there, use it, if it doesn't exist, instead of throwing an error just use null
    if (!user?.email) {
      return navigate("/");
    }

    //had to filter out stocks by country to reduce by 80,000
    getStocks().then((response) => {
      const stocks = response.data.data;
      setStockSymbols(stocks);
    });
  }, []);

  useEffect(() => {
    // watchList.length => determine.. 1 stock? or multistock?
    const stockSymbolsString = watchList.join(", "); // turns array to comma separated string
    if (stockSymbolsString) {
      getStockPrice(stockSymbolsString)
        .then((res) => {
          setStocksData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [watchList]); // Dependency Array
  // run this useEffect when the state inside this array changes

  const addToWatchList = (symbol) => {
    // this function edits state in this component
    // but, it depends on data coming from a child component to know what to add
    // hence, we have to pass the function as a prop to WatchListSearch
    // where symbol represents the stockSymbolToAdd coming from handleSubmit
    // check to see whether or not this symbol is already in the users watchlist
    const symbolIsInWatchList = watchList.includes(symbol);
    // includes returns true if one of the values contained within it match the value in the parenthesis
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

  const deleteFromWatchList = (symbolToDelete) => {
    // symbolToDelete will be something like "AAPL"
    // we don't copy the array first.. because we are not modifying it directly
    // we are only using it to read from.. and newWatchList is the new updated array

    // what .filter does, is loops over the watchList Array
    const newWatchList = watchList.filter((symbol) => {
      // symbol might be AAPL, or it might be SPY, etc.
      // we write return <CONDITION> to say:
      // if the symbol you are looping over does NOT MATCH, symbolToDelete
      // it is allowed to be moved into newWatchList
      // if the symbol you are looping over DOES MATCH symbolToDelete
      // it is NOT ALLOWED, and will be filtered OUT
      return symbol !== symbolToDelete;
    });
    setWatchList(newWatchList);
    setWatchListToLocalStorage(user.email, newWatchList);
  };

  const renderStockCards = () => {
    // setup an array to hold the react components, initialize as empty array
    const stockCards = [];


    // for in loop over stockData to loop since API data is returned as an OBJECT
    const multiStock = watchList.length > 1;
    if (multiStock) {
      
      for (let stockKey in stocksData) {
        const stockData = stocksData[stockKey];
        // for each stock Object, push a StockCard component into the array
        stockCards.push(
          <StockCard
            key={stockData.name}
            stock={stockData}
            deleteFromWatchList={deleteFromWatchList}
          />
        );
        // passing in the stock object as props
      }

      // return array
    } else {
      stockCards.push(
        <StockCard
          key={stocksData.name}
          stock={stocksData}
          deleteFromWatchList={deleteFromWatchList}
        />
      );
    }
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
                {/* the ternary prevents this function from firing until it has data to load */}
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
