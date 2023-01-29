import "./Header.scss";
import { React } from "react";
import { useState, createContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ReactSwitch from "react-switch";
import { TickerTape } from "react-ts-tradingview-widgets";

const styles = {
  symbols: [
    {
      proName: "FOREXCOM:SPXUSD",
      title: "S&P 500",
    },
    {
      description: "QQQ",
      proName: "NASDAQ:QQQ",
    },
    {
      description: "Meta",
      proName: "NASDAQ:FB",
    },
    {
      description: "Apple",
      proName: "NASDAQ:AAPL",
    },
    {
      description: "Amazon",
      proName: "NASDAQ:AMZN",
    },
    {
      description: "Netflix",
      proName: "NASDAQ:NFLX",
    },
    {
      description: "Google",
      proName: "NASDAQ:GOOG",
    },
    {
      description: "Tesla",
      proName: "NASDAQ:TSLA",
    },
  ],
  parent: {
    fontSize: "0px",
    lineHeight: "0px",
    color: "red",
  },
  link: {
    textDecoration: "line-trough",
  },
  span: {
    color: "darkblue",
  },
};

export const ThemeContext = createContext(null);

// export const ThemeContext = createContext(null);
function Header() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <section>
          <div className="header" id={theme}>
            <NavLink to={"/"}>
              <div className="header_logo-container">
                <div className="header_logo">
                  <span className="header_green">Trade</span>
                  <span className="header_yellow">By</span>
                  <span className="header_red">Colors</span>
                </div>
                <div className="header_logo-subheader">
                  Highlight Market Momentum
                </div>
              </div>
            </NavLink>

            <div className="header_hamburger">
              <div className="header_watchlist">Watchlist</div>
              <NavLink to={"/About"} style={{ textDecorationColor: "none" }}>
                <div className="header_about">About</div>
              </NavLink>
              <div className="header_switch">
                <label className="header_switch-label"></label>
                <div className="header_switch">
                  <label>
                    {theme === "light" ? "Light Mode" : "Dark Mode"}
                  </label>
                  <ReactSwitch
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                  />
                </div>
              </div>
            </div>
          </div>
          <TickerTape
            copyrightStyles={styles}
            line-height="0"
            symbols={styles.symbols}
          />
        </section>
      </ThemeContext.Provider>
    </>
  );
}

export default Header;
