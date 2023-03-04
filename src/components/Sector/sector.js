import axios from "axios";
import { getStockPrice } from "../../components/api/api";
import { useState, useEffect } from "react";
import StockCard from "../Stockcard/Stockcard";
import { sectors } from "../Utilities/sectorsData";
import { useParams } from "react-router-dom";

function Sector() {
  const { sectorSymbol } = useParams();
  const { title, stockSymbols } = sectors[sectorSymbol];

  const [stocksData, setStocksData] = useState();

  // Origional API call returning an OBJECT for ticker symbols
  useEffect(() => {
    getStockPrice(stockSymbols)
      .then((res) => {

        setStocksData(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

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
      <h1>{title}</h1>

      {/* Defensive programming logic to prevent variables 
    from being accessed before they have been properly initialized 
    and timing out the API call*/}

      {/* if (stockData && stockData.length > 0) {

    } */}
      {stocksData ? (
        <div className="cards-parent">
          {/* markup for a parent container */}
          {renderStockCards()}
          {/* markup for a parent container */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Sector;
