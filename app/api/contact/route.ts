// Vercel API Route - Google Apps Script proxy
// This route handles CORS issues by proxying requests to GAS

import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

export async function POST(request: NextRequest) {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        { result: "error", message: "GAS URL not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Forward request to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { result: "error", message: "Failed to submit form" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
