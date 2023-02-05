import "./Stockcard.scss";
import { useEffect, useState } from "react";
import { getStockTechnicalAlignment } from "../api/api";

const StockCard = ({ stock }) => {
  const [indicatorData, setIndicatorData] = useState();
  console.log(indicatorData)
  console.log(stock)
  const useApi = true;

  useEffect(() => {
    if (useApi) {
      getStockTechnicalAlignment(stock.symbol).then((data) => {
        console.log(data);
        
        const [ema8Day, ema13Day, ema21Day] = 
        setIndicatorData({
          ema8Day: ema8Day.values[0],
          ema13Day: ema13Day.values[0],
          ema21Day: ema21Day.values[0],
          
        });
      
      });
    }
  }, []);

  const getCardStyle = () => {

  

    const fastOverMedium = indicatorData.ema8Day.ema > indicatorData.ema13Day.ema;
    const mediumOverSlow = indicatorData.ema13.ema > indicatorData.ema21day.ema;
    const emaAlignment = fastOverMedium && mediumOverSlow;
     
    // const fastUnderMedium =  indicatorData.ema8Day.ema < indicatorData.ema13Day.ema;
    // const mediumUnderSlow = indicatorData.ema13.ema < indicatorData.ema21day.ema;
    // const emaNegativeAlignment = fastUnderMedium && mediumUnderSlow;

    // const noAlighnment = emaAlignment || emaNegativeAlignment
    
      

    let color = " ";
    if (emaAlignment) {
      color = "green";
    } else{
      color = "red";
    } 
    const style = { backgroundColor: color };

    return style;
  };

  return (
    <>
      <section id="test">
        <div>
          {indicatorData ? (
            <div id="sector_card" style={getCardStyle()}>
              <div className="sector_name">{stock.name}</div>
              <div>
                <span className="sector_info">Symbol:</span>
                {stock.symbol}
              </div>
              <div>
                <span className="sector_name">Share Price:</span>{" "}
                <span clasName="sector_info">{stock.close}</span>
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
        </div>
      </section>
    </>
  );
};

export default StockCard;
