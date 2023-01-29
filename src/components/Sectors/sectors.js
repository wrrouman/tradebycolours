import axios from "axios";
import { getStockPrice } from "../../components/api/api";
import { createContext, useState, useEffect } from "react";

function Sectors() {
  useEffect(() => {
    getStockPrice()
      .then((res) => {
        console.log(res.data.symbol);

        setStockData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [stockData, setStockData] = useState();

  return (
    <>
      <div>Sectors Home Page</div>
    </>
  );
}

export default Sectors;
