import { getCompanyFinance } from "@/lib/services/financeService";
import { getCompanyNews } from "@/lib/services/newsService";
import { generateInvestmentAnalysis } from "@/lib/ai/investmentChain";

export async function analyzeCompany(company) {
  const finance = await getCompanyFinance(company);

  if (!finance) {
    throw new Error("Unable to fetch company financial data.");
  }

  const news = await getCompanyNews(company);

  const analysis = await generateInvestmentAnalysis({
    company,
    finance,
    news,
  });

  return {
    ...analysis,
    finance,
    news,
  };
}