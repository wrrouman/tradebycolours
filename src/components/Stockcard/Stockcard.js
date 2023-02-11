import "./Stockcard.scss";
import { useEffect, useState } from "react";
import { getStockTechnicalAlignment } from "../api/api";
import { Link } from "react-router-dom";

const StockCard = ({ stock }) => {
  const [indicatorData, setIndicatorData] = useState();
  console.log(indicatorData);
  console.log(stock);
  const useApi = true;

  useEffect(() => {
    if (useApi) {
      getStockTechnicalAlignment(stock.symbol).then((data) => {
        console.log(data);

        const [ema8Day, ema21Day, ppoData] = data;

        // const [ema8Day, ema13Day, ema21Day] = // destructuring statement
        setIndicatorData({
          // state 'setter'
          ema8Day: ema8Day.values[0],
          ema21Day: ema21Day.values[0],
          ppoData: ppoData.values[0],
        });
      });
    }
  }, []);

  const getCardStyle = () => {
    const fastOverSlow = indicatorData.ema8Day.ema > indicatorData.ema21Day.ema;
    const ppoAbove1 = indicatorData.ppoData.ppo > 1;

    let color = "";
    if (fastOverSlow && ppoAbove1) {
      color = "rgb(16, 194, 16";
    } else if (!fastOverSlow && !ppoAbove1) {
      color = "crimson";
    } else {
      color = "goldenrod";
    }

    const style = { backgroundColor: color };
    return style;
  };

  const sectorLink = stock.symbol === "SPY" ? "/" : `/sector/${stock.symbol}`;

  return (
    <>
      <article>
        <div id="test">
          <Link to={sectorLink}>
            {indicatorData ? (
              <div id="sector_card" style={getCardStyle()}>
                <div className="stock_name">{stock.name}</div>
                <div>
                  <span className="card_info">Symbol: </span>

                  <span className="sector_info">{stock.symbol}</span>
                </div>
                <div>
                  <span className="card_info">Share Price: </span>
                  <span className="sector_info">{stock.close}</span>
                </div>
                <div>
                  <span className="card_info"> % Change: </span>
                  <span className="sector_info"> {stock.percent_change}</span>
                </div>
                <div>
                  <span className="card_info">8 Day Average: </span>
                  <span className="sector_name">
                    {" "}
                    <span className="sector_info">
                      {" "}
                      {indicatorData.ema8Day.ema}
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="stockcard">loading...</div>
            )}
          </Link>
        </div>
      </article>
    </>
  );
};

export default StockCard;
