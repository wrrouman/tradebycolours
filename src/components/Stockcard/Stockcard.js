import "./Stockcard.scss";
import { useEffect, useState } from "react";
import { getStockTechnicalAlignment, shortTermlAlignment } from "../api/api";
import { getIndicatorMomentum, momentumStatuses } from "../Utilities/toolBelt";
import { Link } from "react-router-dom";

const StockCard = ({
  stock,
  isSector = false,
  deleteFromWatchList = false,
}) => {
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

    let color2 = "";

    switch (momentumStatus) {
      case POSITIVE:
        color2 = "green";

        break;
      case NEUTRAL:
        color2 = "goldenrod";

        break;
      case NEGATIVE:
        color2 = "crimson";

        break;
    }
    const momentumStyle = { backgroundColor: color2 };
    return momentumStyle;
  };
  let sectorLink;
  if (isSector) {
    sectorLink = stock.symbol === "SPY" ? "/" : `/sector/${stock.symbol}`;
  } else {
    sectorLink = "#";
  }

  return (
    <>
      <article>
        <div id="stockcard_container">
          <Link to={sectorLink}>
            {indicatorData ? (
              <div id="sector_card" style={getCardStyle()}>
                {deleteFromWatchList && (
                  <button onClick={() => deleteFromWatchList(stock.symbol)}>
                    ❌
                  </button>
                )}
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
                <div className="short-term-momentum_container">
                  <span className="card_info"> Entry & Exit Signal: </span>
                  <div
                    className="short-term-momentum"
                    style={getShortTermEmoji()}
                  ></div>
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
