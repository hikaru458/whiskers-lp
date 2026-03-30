/**
 * Whiskers お問い合わせフォーム - Google Apps Script
 * 
 * セットアップ手順:
 * 1. Google スプレッドシートを作成
 * 2. 拡張機能 > Apps Script を開く
 * 3. このコードを貼り付け
 * 4. デプロイ > 新しいデプロイ > Webアプリ
 * 5. アクセス権: "すべて" に設定
 * 6. デプロイ後のURLをコピーし、Vercelの環境変数に設定
 */

// CORS対応ヘッダー
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}

// プリフライトリクエスト（OPTIONS）処理
function doOptions(e) {
  var output = ContentService.createTextOutput(JSON.stringify({}));
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeaders(getCorsHeaders());
  return output;
}

// メイン処理（POSTリクエスト）
function doPost(e) {
  try {
    // POSTデータを取得
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを取得（アクティブなシート）
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // ヘッダー行がない場合は作成
    if (sheet.getRange(1, 1).getValue() === "") {
      const headers = [
        "タイムスタンプ",
        "タイプ", 
        "お名前",
        "会社名/SNSアカウント",
        "メールアドレス",
        "お問い合わせ種別",
        "お問い合わせ内容",
        "ステータス"
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#ff6b35")
        .setFontColor("white");
    }
    
    // データを整形
    const rowData = [
      new Date(),                           // タイムスタンプ
      data.type === "brand" ? "企業様" : "クリエイター様",  // タイプ
      data.name || "",                      // お名前
      data.company || "",                   // 会社名/SNSアカウント
      data.email || "",                     // メールアドレス
      data.category || "",                  // お問い合わせ種別
      data.message || "",                   // お問い合わせ内容
      "未対応"                              // ステータス
    ];
    
    // スプレッドシートに追加
    sheet.appendRow(rowData);
    
    // 成功レスポンス
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "お問い合わせを受け付けました"
    }))
    .setResponseHeaders(getCorsHeaders())
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error("Error:", error);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    }))
    .setResponseHeaders(getCorsHeaders())
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// GETリクエスト（テスト用）
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    result: "success",
    message: "GASが正常に動作しています"
  }))
  .setResponseHeaders(getCorsHeaders())
  .setMimeType(ContentService.MimeType.JSON);
}

// スプレッドシートの行数を取得する関数（管理用）
function getSubmissionCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getLastRow() - 1; // ヘッダーを除く
}

// メール通知機能（オプション：Gmailで通知を受け取りたい場合）
function sendNotificationEmail(formData) {
  const recipient = "hello@whiskers.jp"; // 通知先メールアドレス
  const subject = `【Whiskersお問い合わせ】${formData.name}様より`;
  
  const body = `
新しいお問い合わせが届きました。

━━━━━━━━━━━━━━━━━━━━━━
【お問い合わせ内容】
━━━━━━━━━━━━━━━━━━━━━━

タイプ: ${formData.type === "brand" ? "企業様" : "クリエイター様"}
お名前: ${formData.name}
${formData.company ? `会社名/SNS: ${formData.company}\n` : ""}メールアドレス: ${formData.email}
お問い合わせ種別: ${formData.category}

【お問い合わせ内容】
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━

スプレッドシートで確認してください。
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
