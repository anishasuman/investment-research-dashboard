import { NextResponse } from "next/server";
import { analyzeCompany } from "@/lib/services/analysisService";

export async function POST(request) {
  try {
    const body = await request.json();

    const { company } = body;

    if (!company || !company.trim()) {
      return NextResponse.json(
        {
          error: "Company name is required.",
        },
        {
          status: 400,
        }
      );
    }

    const analysis = await analyzeCompany(company.trim());

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analyze API Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to analyze company.",
      },
      {
        status: 500,
      }
    );
  }
}