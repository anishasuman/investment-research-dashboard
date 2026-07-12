import axios from "axios";

export async function getCompanyNews(company) {
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      company
    )}&lang=en&max=5&apikey=${process.env.GNEWS_API_KEY}`;

    const response = await axios.get(url);

    if (!response.data?.articles) {
      return [];
    }

    return response.data.articles.map((article) => ({
      title: article.title,
      source: article.source?.name || "Unknown",
      url: article.url,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    console.error("GNews Error:", error.response?.data || error.message);
    return [];
  }
}