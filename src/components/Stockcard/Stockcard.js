import "./Stockcard.scss";
import { useEffect, useState } from "react";
import { getStockTechnicalAlignment } from "../api/api";
import { MiniChart } from "react-ts-tradingview-widgets";

const StockCard = ({ stock }) => {
  const [indicatorData, setIndicatorData] = useState();

  const useApi = true;

  useEffect(() => {
    if (useApi) {
      getStockTechnicalAlignment(stock.symbol).then((data) => {
        console.log(data);
        // data will contain an array []
        // data[0] == EMA10Day
        // data[1] == EMA20Day
        // data[2] == PPO
        const [ema10Day, ema20Day] = data;
        setIndicatorData({
          ema10Day: ema10Day.values[0],
          ema20Day: ema20Day.values[0],
        });
      });
    }
  }, []);

  const getCardStyle = () => {
    const ema10GreaterThan20 =
      indicatorData.ema10Day.ema > indicatorData.ema20Day.ema;
    // const isPpoAbove1 = true;
    // const allInAlignment = ema10GreaterThan20 && isPpoAbove1;
    // const atLeast1IsTrue = ema10GreaterThan20 || isPpoAbove1;
    // const color = "";
    // if (allInAlignment) {
    //     color = 'green'
    // } else if (atLeast1IsTrue) {
    //     color = 'yellow';
    // } else {
    //     color = 'red';
    // }
    // const style = { backgroundColor: color };
    const style = { backgroundColor: ema10GreaterThan20 ? "green" : "red" };
    return style;
  };

  return (
    <>
      <article>
        {indicatorData ? (
          <div className="sector_card" style={getCardStyle()}>
            <div className="sector_name">{stock.name}</div>
            <div>
              <span className="sector_info">Symbol:</span>
              {stock.symbol}
            </div>
            <div>
              <span className="sector_name">Share Price:</span> <span clasName="sector_info">{stock.close}</span>
            </div>
            <div>
              <span className="sector_name">% Change:</span>
              {"    "}
              {stock.percent_change}
            </div>
            <div>
              <span className="sector_name">10 Day Average:</span>
              {"   "}
              {indicatorData.ema10Day.ema}
            </div>
            {/* <div><MiniChart colorTheme="dark" width="100%"></MiniChart></div> */}
          </div>
        ) : (
          <div className="stockcard">loading...</div>
        )}
      </article>
    </>
  );
};

export default StockCard;
