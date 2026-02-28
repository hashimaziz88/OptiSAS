import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface ProposalDraftRequestBody {
  opportunityTitle: string;
  clientName: string;
  stage: string;
  estimatedValue: number;
  currency: string;
  probability: number;
  description?: string;
  expectedCloseDate?: string;
}

const SYSTEM_INSTRUCTION =
  "You are an expert B2B sales proposal writer for Boxfusion, an enterprise software " +
  "company selling to government clients in South Africa. Generate professional, concise, " +
  "and compelling proposal content suitable for formal government procurement.";

function buildPrompt(body: ProposalDraftRequestBody): string {
  return (
    `Generate a professional B2B sales proposal title and description for this opportunity:\n\n` +
    `Opportunity: ${body.opportunityTitle}\n` +
    `Client: ${body.clientName}\n` +
    `Stage: ${body.stage}\n` +
    `Estimated Value: ${body.currency} ${body.estimatedValue.toLocaleString()}\n` +
    `Win Probability: ${body.probability}%\n` +
    (body.description ? `Opportunity Context: ${body.description}\n` : "") +
    (body.expectedCloseDate
      ? `Expected Close: ${new Date(body.expectedCloseDate).toLocaleDateString("en-ZA")}\n`
      : "") +
    `\nProvide a concise professional title (max 15 words) and a compelling ` +
    `2–3 sentence description for a formal government/enterprise proposal document.`
  );
}

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
  required: ["title", "description"],
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: ProposalDraftRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { opportunityTitle, clientName } = body;

  if (!opportunityTitle || !clientName) {
    return NextResponse.json(
      { error: "Missing required fields: opportunityTitle and clientName" },
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
      contents: buildPrompt(body),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        maxOutputTokens: 400,
        temperature: 0.6,
      },
    });

    const raw = response.text?.trim() ?? null;

    if (!raw) {
      return NextResponse.json(
        { error: "No draft was generated. Please try again." },
        { status: 500 },
      );
    }

    const result = JSON.parse(raw) as { title: string; description: string };
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Gemini API error: ${message}` },
      { status: 500 },
    );
  }
}
