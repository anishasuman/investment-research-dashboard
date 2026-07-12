import { z } from "zod";

export const analysisSchema = z.object({
  company: z.string(),

  recommendation: z.string(),

  confidence: z.number().min(0).max(100),

  summary: z.string(),

  riskLevel: z.string(),

  targetPrice: z.string(),

  expectedReturn: z.string(),

  timeHorizon: z.string(),

  pros: z.array(z.string()),

  cons: z.array(z.string()),
});