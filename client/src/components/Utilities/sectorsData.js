

const sectors = {
  SPY: {
    title: "SPDR S&P 500 ETF Trust",
    stockSymbols: "",
  },
  XLK: {
    title: "Technology Select Sector Fund",
    stockSymbols:
      "AAPL, MSFT, ADBE, CSCO, NVDA, CRM, V, QCOM, AMD, INTC, AMZN  ",
  },
  XLV: {
    title: "Health Care Select Sector Fund",
    stockSymbols: "UNH, JNJ, MRK, LLY, PFE, biib, AMGN, CVS, MRNA ",
  },
  XLF: {
    title: "Financial Select Sector Fund",
    stockSymbols: "GS, JPM, BAC, MS, BRK.B, BLK, TD, WFC, IBKR, SCHW",
  },

  XLC: {
    title: "Communications Services Select Fund",
    stockSymbols:
      "META, GOOGL, VZ, DIS, NFLX, TMUS, T, WBD, TTWO, TTWO, ATVI,CHTR, LYV",
  },

  XLI: {
    title: "Industrial Select Fund",
    stockSymbols: "RTX, HON, UPS, CAT, BA, DE, LMT, GE, MMM, FDX, WM, JCI",
  },

  XLE: {
    title: "Energy Select Sector",
    stockSymbols: "XOM, CVX, SLB, EOG, COP, VLO, PXD, OXY, MPC, HAL, DVN, FANG",
  },

  XLY: {
    title: "Consumer Discretionary",
    stockSymbols:
      "AMZN, TSLA, HD, NKE, MCD, LOW, SBUX, BKNG, TJX, TGT, CMG, F",
  },

  XLP: {
    Title: "Consumer Staples",
    stockSymbols: "PG, PEP, KO, COST, PM, WMT, MDLZ, MO, CL, EL, ",
  },
};

const sectorSymbols = Object.keys(sectors).join(", ");

export { sectors, sectorSymbols };
