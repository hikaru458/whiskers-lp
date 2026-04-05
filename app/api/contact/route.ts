import { NextResponse } from "next/server";

// 環境変数が機能しない場合のため直接URLを設定
const GAS_WEBAPP_URL = process.env.NEXT_PUBLIC_GAS_WEBAPP_URL || 
  "https://script.google.com/macros/s/AKfycbzUOWe1RouwBV9jU1rNrmmE6GKTf34rleyrtwxyAPkeml9ivBc-_xk6vNC0ON6KxlC8Aw/exec";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    if (!GAS_WEBAPP_URL) {
      return NextResponse.json(
        { success: false, message: "GAS URLが設定されていません" },
        { status: 500 }
      );
    }

    // URLパラメータを構築
    const params = new URLSearchParams({
      name: formData.name || "",
      email: formData.email || "",
      type: formData.type || "general",
      message: formData.message || "",
    });

    // サーバーサイドからGASを呼び出し（CORSなし）
    const response = await fetch(`${GAS_WEBAPP_URL}?${params.toString()}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`GAS error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
