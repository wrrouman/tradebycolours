import "./Stockcard.scss";
import { useEffect, useState } from "react";
import { getStockTechnicalAlignment, shortTermlAlignment } from "../api/api";
import { getIndicatorMomentum, momentumStatuses } from "../Utilities/toolBelt";
import { Link } from "react-router-dom";

const StockCard = ({ stock }) => {
  const [indicatorData, setIndicatorData] = useState();
  const useApi = true;

  useEffect(() => {
    if (useApi) {
      getStockTechnicalAlignment(stock.symbol).then((data) => {

        const [
          ema8Day,
          ema8Day2Hour,
          ema21Day,
          ema21Day2Hour,
          ppoData1Day,
          ppoData2Hour,
        ] = data;

        // const [ema8Day, ema13Day, ema21Day] = // destructuring statement
        setIndicatorData({
          // state 'setter'
          ema8Day: ema8Day.values[0],
          ema8Day2Hour: ema8Day2Hour.values[0],
          ema21Day: ema21Day.values[0],
          ema21Day2Hour: ema21Day2Hour.values[0],
          ppoData1Day: ppoData1Day.values[0],
          ppoData2Hour: ppoData2Hour.values[0],
        });
      });
    }
  }, []);

  // refactor this to separate logic from presentation
  // one function to get that answer (fastOverSlow && ppoAbove1)
  // ema8Day, ema21Day, ppo

  const getCardStyle = () => {
    const { ema8Day, ema21Day, ppoData1Day } = indicatorData;

    const momentumStatus = getIndicatorMomentum(ema8Day, ema21Day, ppoData1Day);
    // momentumStatus === "POSITIVE", "NEGATIVE", "NEUTRAL"

    const { POSITIVE, NEGATIVE, NEUTRAL } = momentumStatuses;

    let color = "";
    switch (momentumStatus) {
      case POSITIVE:
        color = "rgb(16, 194, 16";
        break;
      case NEUTRAL:
        color = "goldenrod";
        break;
      case NEGATIVE:
        color = "crimson";
        break;
    }
    const style = { backgroundColor: color };
    return style;
  };

  const getShortTermEmoji = () => {
    const { ema8Day2Hour, ema21Day2Hour, ppoData2Hour } = indicatorData;

    const momentumStatus = getIndicatorMomentum(
      ema8Day2Hour,
      ema21Day2Hour,
      ppoData2Hour
    );
    // momentumStatus === "POSITIVE", "NEGATIVE", "NEUTRAL"

    const { POSITIVE, NEGATIVE, NEUTRAL } = momentumStatuses;

    let chartEmoji = "";

    switch (momentumStatus) {
      case POSITIVE:
        chartEmoji = "📈";
        break;
      case NEUTRAL:
        chartEmoji = "🤷";
        break;
      case NEGATIVE:
        chartEmoji = "📉";
        break;
    }
    return chartEmoji;
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
                {/* this is a possible location for the mini indicator data */}
                <div>
                  <span className="card_info"> Short Term Momentum: </span>
                  <span className="sector_info"> {getShortTermEmoji()}</span>
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
