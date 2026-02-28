import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface InsightsRequestBody {
  context: string;
  type: "dashboard" | "report";
}

const SYSTEM_INSTRUCTION =
  "You are a senior sales business analyst for Boxfusion, an enterprise B2B software company. " +
  "Be concise and professional. Use plain text only — no markdown, no asterisks, no hash symbols.";

function buildPrompt(context: string, type: "dashboard" | "report"): string {
  const dataLabel =
    type === "dashboard" ? "CRM dashboard metrics" : "sales report data";
  return (
    `Analyze the following ${dataLabel} and provide:\n` +
    `1. A brief 2-sentence executive summary\n` +
    `2. Two key observations (bullet points using a dash)\n` +
    `3. One specific actionable recommendation\n\n` +
    `Data:\n${context}`
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: InsightsRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { context, type } = body;

  if (!context || !type) {
    return NextResponse.json(
      { error: "Missing required fields: context and type" },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Gemini API key is not configured. Add GEMINI_API_KEY to .env.local.",
      },
      { status: 500 },
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: buildPrompt(context, type),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 300,
        temperature: 0.4,
      },
    });

    const insights = response.text?.trim() ?? null;

    if (!insights) {
      return NextResponse.json(
        { error: "No insights were generated. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ insights });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Gemini API error: ${message}` },
      { status: 500 },
    );
  }
}
