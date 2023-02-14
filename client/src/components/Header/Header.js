import "./Header.scss";
import { React } from "react";
import { useState, createContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Switch from "@mui/material/Switch";

//Tradingview ticker banner
import { TickerTape } from "react-ts-tradingview-widgets";

//Dark mode components (Material UI)
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

//Nav dashboard menu (Material UI)
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

//Material UI code for dark mode theme
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Header({ check, change }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <section>
              <div className="header">
                <NavLink to={"/"}>
                  <div className="header_logo-container">
                    <div className="header_logo">
                      <div>
                        <span className="header_green">Trade</span>
                        <span className="header_yellow">By</span>
                        <span className="header_red">Colors</span>
                      </div>
                      <div className="header_logo-subheader">
                        Highlight Market Momentum
                      </div>
                    </div>
                  </div>
                </NavLink>

                {/* Right side of the nave bar starts here*/}
                <div className="header_controls-container">
                  <div className="heaer_controls-subcontainer">
                    <Link to={"/"} id="link">
                  <div className="header_about">Sectors</div>
                  </Link>
                    <div className="header_watchlist">Watchlist</div>
                    <Link to={"/About"} id="link">
                      <div className="header_about">About</div>
                    </Link>
                  </div>

                  <div className="controls-container">
                    <div className="options-container">
                      <Button
                        style={{ color: "white", fontSize: "18px", fontWeight: "500", padding: "0px" }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        Options
                      </Button >
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <Link  to={"/About"} style={{color:"inherit"}}>
                        <MenuItem onClick={handleClose}>About</MenuItem>
                        </Link>
                        <Link to={"/"} style={{color:"inherit"}}>
                        <MenuItem onClick={handleClose}>Sectors</MenuItem>
                        </Link>
                        <MenuItem onClick={handleClose}>Watchlist</MenuItem>
                      </Menu>
                    </div>
                    <FormGroup style={{ margin: 0 }}>
                      <FormControlLabel
                        style={{ margin: 0 }}
                        control={
                          <MaterialUISwitch  sx={{ m: 1 }} defaultChecked />
                        }
                        onChange={change}
                        checked={check}
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </section>
          </Typography>
        </Toolbar>
        <TickerTape
          copyrightStyles={styles}
          line-height="0"
          symbols={styles.symbols}
        />
      </AppBar>
    </Box>
  );
}

// export default Header;
