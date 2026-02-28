import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface StageHistoryItem {
  fromStageName: string;
  toStageName: string;
  changedAt: string;
  notes?: string;
}

interface ActivitySuggestionRequestBody {
  opportunityTitle: string;
  clientName: string;
  stage: number;
  stageName: string;
  estimatedValue: number;
  probability: number;
  description?: string;
  expectedCloseDate?: string;
  stageHistory: StageHistoryItem[];
}

const SYSTEM_INSTRUCTION =
  "You are an experienced B2B sales coach for Boxfusion, an enterprise software company " +
  "selling to government clients in South Africa. Suggest specific, actionable next steps " +
  "to advance sales opportunities. Be concise and practical.";

function buildPrompt(body: ActivitySuggestionRequestBody): string {
  const historyStr =
    body.stageHistory.length > 0
      ? body.stageHistory
          .map(
            (h) =>
              `  - ${h.fromStageName} → ${h.toStageName} on ` +
              `${new Date(h.changedAt).toLocaleDateString("en-ZA")}` +
              (h.notes ? ` (${h.notes})` : ""),
          )
          .join("\n")
      : "  - No stage transitions recorded yet";

  return (
    `Analyse this sales opportunity and suggest the single best next activity to move it forward:\n\n` +
    `Opportunity: ${body.opportunityTitle}\n` +
    `Client: ${body.clientName}\n` +
    `Current Stage: ${body.stageName}\n` +
    `Estimated Value: R ${body.estimatedValue.toLocaleString()}\n` +
    `Win Probability: ${body.probability}%\n` +
    (body.description ? `Context: ${body.description}\n` : "") +
    (body.expectedCloseDate
      ? `Expected Close: ${new Date(body.expectedCloseDate).toLocaleDateString("en-ZA")}\n`
      : "") +
    `Stage History:\n${historyStr}\n\n` +
    `Return the most impactful next activity. ` +
    `activityType must be one of: 1=Meeting, 2=Call, 3=Email, 4=Task, 5=Presentation, 6=Other. ` +
    `priority must be one of: 1=Low, 2=Medium, 3=High, 4=Urgent. ` +
    `Keep subject concise (max 10 words). Description: 1–2 sentences. ` +
    `Reasoning: 1 sentence explaining why this activity is most important right now.`
  );
}

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    activityType: { type: "number" },
    subject: { type: "string" },
    description: { type: "string" },
    priority: { type: "number" },
    reasoning: { type: "string" },
  },
  required: ["activityType", "subject", "description", "priority", "reasoning"],
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: ActivitySuggestionRequestBody;
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
        maxOutputTokens: 350,
        temperature: 0.5,
      },
    });

    const raw = response.text?.trim() ?? null;

    if (!raw) {
      return NextResponse.json(
        { error: "No suggestion was generated. Please try again." },
        { status: 500 },
      );
    }

    const result = JSON.parse(raw) as {
      activityType: number;
      subject: string;
      description: string;
      priority: number;
      reasoning: string;
    };
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Gemini API error: ${message}` },
      { status: 500 },
    );
  }
}
