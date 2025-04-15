import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();

    if (!notes) {
      return NextResponse.json({ error: "No notes provided" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`Summarize this:\n\n${notes}`);
    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "Gemini failed" }, { status: 500 });
  }
}
