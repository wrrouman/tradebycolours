import axios from "axios";
import { getStockPrice } from "../../components/api/api";
import { createContext, useState, useEffect } from "react";
import StockCard from "../Stockcard/Stockcard";

function Sectors() {

  const [stocksData, setStocksData] = useState();



  // useEffect(() => {
  //   getStockPrice()
  //     .then((resp) => resp.json())
  //     .then((response) => setStockData(response));
  // }, []);


  //Second API call not working 
  // useEffect(() => {
  //   fetch(getStockPrice)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setStockData(data);
  //     })
  //     .catch((err) => {
      
  //     });
  // }, []);


  // Origional API call returning an OBJECT
  useEffect(() => {
    getStockPrice()
      .then((res) => {
        console.log(res.data);

        setStocksData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderStockCards = () => {
      // setup an array to hold the react components, initialize as empty array
      const stockCards = [];

      // for in loop over stockData
      for(let stockKey in stocksData) {
          const stockData = stocksData[stockKey];
        // for each stock Object, push a StockCard component into the array
        stockCards.push(<StockCard  key={stockData.name} stock={stockData}/>)
        // passing in the stock object as props
       }

      // return array 
      return stockCards;
  }
  

  return (
    <>

    <h1>S&P 500 and Sector Momentum </h1>
    {/* some kind of defensive programming logic to prevent variables 
    from being accessed before they have been properly initialized */}
    {/* if (stockData && stockData.length > 0) {

    } */}
    {stocksData ? 
    <>
    {/* markup for a parent container */}
    {renderStockCards()}
    {/* markup for a parent container */}
    </> : <p>Loading...</p>
    }
      {/* <div>{stockData.name}</div>
      <div>{stockData.close}</div>
      <div>{stockData.NVDA.name}</div>
      <div>{stockData.AAPL.name}</div>
      <div>{stockData.percent_change}</div>
      <div>{stockData.datetime}</div> */}

    </>
  );
}

export default Sectors;
