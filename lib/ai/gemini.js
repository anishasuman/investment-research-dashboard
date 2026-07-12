import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { geminiConfig } from "@/lib/config/geminiConfig";

export const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: geminiConfig.model,
  temperature: geminiConfig.temperature,
  maxOutputTokens: geminiConfig.maxOutputTokens,
});