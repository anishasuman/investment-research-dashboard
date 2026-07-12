import { model } from "./gemini";
import { analysisPrompt } from "./analysisPrompt";
import { analysisSchema } from "@/types/analysisSchema";

export async function generateInvestmentAnalysis(data) {
  const prompt = analysisPrompt(data);

  // Ask Gemini to enforce the schema at the API level. Prompt-only JSON
  // instructions are not reliable: the model can still add prose, markdown,
  // or return a partially formatted response, all of which break JSON.parse.
  const structuredModel = model.withStructuredOutput(analysisSchema, {
    name: "investment_analysis",
  });

  try {
    return await structuredModel.invoke(prompt);
  } catch (error) {
    console.error("Gemini structured analysis failed:", error);
    throw new Error(
      "Gemini could not generate a complete investment analysis. Please try again."
    );
  }
}
