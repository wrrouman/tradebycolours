import axios from "axios";
import { getStockPrice,stockLogo } from "../../components/api/api";
import { createContext, useState, useEffect } from "react";
import StockCard from "../Stockcard/Stockcard";



function Sectors() {


  const [stocksData, setStocksData] = useState();

  const [logo, setlogo] = useState();
  
  //logo call (Need to figue out how to batch call)
  useEffect(() => {
    stockLogo()
      .then((res) => {
        console.log(res.data);
        // setlogo(res.data);
      })
      .catch((error) => console.log(error));
  }, []);


  // Origional API call returning an OBJECT for ticker symbols
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



      // for in loop over stockData to loop since API data is returned as an OBJECT
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


    {/* Defensive programming logic to prevent variables 
    from being accessed before they have been properly initialized 
    and timing out the API call*/}


    {/* if (stockData && stockData.length > 0) {

    } */}
    {stocksData ? 
    <>
    {/* markup for a parent container */}
    {renderStockCards()}
    {/* markup for a parent container */}
    </> : <p>Loading...</p>
    }
    
    </>
  );
}

export default Sectors;
