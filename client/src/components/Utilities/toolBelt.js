const formatQuoteData = (quotesObject) => {
  const formattedQuotesObject = { ...quotesObject };
  for (let stockKey in formattedQuotesObject) {
    const stockObject = formattedQuotesObject[stockKey];
    for (let stockProperty in stockObject) {
      let stockPropertyValue = stockObject[stockProperty];
      if (typeof stockPropertyValue === "string") {
        const valueIsFloat = stockPropertyValue.search(/\-?\d+\.\d+/);

        if (valueIsFloat !== -1 && !Number.isNaN(Number(stockPropertyValue))) {
          // it is a float, like 3.14, etc.
          // turn it into a number, with a twoFixed of 2 decimal points
          formattedQuotesObject[stockKey][stockProperty] =
            Number(stockPropertyValue).toFixed(2);
        }
      }
    }
  }
  return formattedQuotesObject;
};

export { formatQuoteData };
