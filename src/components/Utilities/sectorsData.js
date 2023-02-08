// const sectors = "SPY, XLK, XLV, XLF,";

const sectors = {
  SPY: {
    title: "SPDR S&P 500 ETF Trust",
    stockSymbols: "XLK, XLV, xle, XLI, XLF, XLC",
  },
  XLK: {
    title: "Technology Select Sector SPDR Fund",
    stockSymbols:
      "AAPL, MSFT, ADBE, CSCO, NVDA, CRM, V, QCOM, AMD, INTC, AMZN  ",
  },
  XLV: {
    title: "Health Care Select Sector SPDR Fund",
    stockSymbols: "UNH, JNJ, MRK, LLY, PFE, biib, AMGN, CVS, MRNA ",
  },
  XLF: {
    title: "Financial Select Sector SPDR Fund",
    stockSymbols: "GS, JPM, BAC, MS, BRK.B, BLK, WFC, AMX, SCHW",
  },
};

const sectorSymbols = Object.keys(sectors).join(", ");

export { sectors, sectorSymbols };
