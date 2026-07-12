import YahooFinance from "yahoo-finance2";

// yahoo-finance2 v3 exports a client class. Creating it once keeps the
// connection configuration shared across every analysis request.
const yahooFinance = new YahooFinance();

function formatMarketCap(value) {
  if (!value) return "N/A";

  if (value >= 1_000_000_000_000)
    return (value / 1_000_000_000_000).toFixed(2) + " T";

  if (value >= 1_000_000_000)
    return (value / 1_000_000_000).toFixed(2) + " B";

  if (value >= 1_000_000)
    return (value / 1_000_000).toFixed(2) + " M";

  return value.toLocaleString();
}

export async function getCompanyFinance(company) {
  try {
    const search = await yahooFinance.search(company);

    if (!search?.quotes?.length) {
      throw new Error("Company not found");
    }

    const symbol = search.quotes[0].symbol;

    const quote = await yahooFinance.quote(symbol);

    return {
      company: quote.shortName || company,

      symbol,

      currentPrice: quote.regularMarketPrice ?? "N/A",

      previousClose:
        quote.regularMarketPreviousClose ?? "N/A",

      marketCap: formatMarketCap(
        quote.marketCap
      ),

      peRatio:
        quote.trailingPE ?? "N/A",

      eps:
        quote.epsTrailingTwelveMonths ?? "N/A",

      fiftyTwoWeekHigh:
        quote.fiftyTwoWeekHigh ?? "N/A",

      fiftyTwoWeekLow:
        quote.fiftyTwoWeekLow ?? "N/A",

      currency:
        quote.currency ?? "USD",
    };
  } catch (error) {
    console.error(
      "Yahoo Finance Error:",
      error.message
    );

    return null;
  }
}
