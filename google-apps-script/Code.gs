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

const SHEET_NAME = 'お問い合わせ';

// --- CORS: OPTIONS（プリフライト） ---
function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// --- POST ---
function doPost(e) {
  try {
    const params = e.parameter;

    if (!params.name || !params.email || !params.message) {
      return createResponse(false, '必須項目が入力されていません。');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      return createResponse(false, 'メールアドレスの形式が正しくありません。');
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return createResponse(false, 'シートが見つかりません: ' + SHEET_NAME);
    }

    sheet.appendRow([
      new Date(),
      params.name,
      params.email,
      getTypeLabel(params.type || 'general'),  // ← 日本語変換
      params.message,
      '未対応'
    ]);

    sendNotification({
      name: params.name,
      email: params.email,
      type: getTypeLabel(params.type || 'general'),  // ← 日本語変換
      message: params.message
    });

    return createResponse(true, 'お問い合わせを受け付けました。');

  } catch (error) {
    console.error('Error:', error);
    return createResponse(false, 'エラーが発生しました: ' + error.message);
  }
}

// --- 共通レスポンス（CORS付き） ---
function createResponse(success, message) {
  const output = JSON.stringify({ success, message });

  return ContentService
    .createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// --- メール通知（任意） ---
function sendNotification(params) {
  try {
    const recipient = 'your-email@example.com';
    const subject = '【Whiskers】新しいお問い合わせがありました';
    const body = `
新しいお問い合わせが届きました。

━━━━━━━━━━━━━━━━━━━━
【お名前】
${params.name}

【メールアドレス】
${params.email}

【お問い合わせ種別】
${getTypeLabel(params.type)}

【メッセージ】
${params.message}
━━━━━━━━━━━━━━━━━━━━

スプレッドシートで確認してください。
    `;
    GmailApp.sendEmail(recipient, subject, body);
  } catch (e) {
    console.error('メール送信エラー:', e);
  }
}

function getTypeLabel(type) {
  const labels = {
    general: '一般的なお問い合わせ',
    business: '企業様向けお問い合わせ',
    creator: 'クリエイター様向けお問い合わせ',
    media: '取材・メディア関連',
    other: 'その他'
  };
  return labels[type] || type;
}
