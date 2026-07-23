import { NextResponse } from "next/server";
import { getAIResponse } from "@/lib/ai/orchestrator";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { success: false, message: "A prompt is required." },
        { status: 400 }
      );
    }

    const result = await getAIResponse(prompt);
    return NextResponse.json(result);
  } catch (error) {
    console.warn("StudyFlow AI: route handler failed.", error.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
