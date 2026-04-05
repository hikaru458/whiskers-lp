/**
 * Whiskers お問い合わせフォーム - Google Apps Script
 * 
 * 【重要】SHEET_ID を設定してください
 * スプレッドシートURL: https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/edit
 *                                           ↑ここがSHEET_ID
 */

const SHEET_ID = '1E4nkcGkcSzTJ-WsvZo8L5Cx33GqvGiu3FGEC-0uBDT8';  // ← Whiskersお問い合わせシート
const SHEET_NAME = 'お問い合わせ';

// --- CORS 共通ヘッダー ---
function setCors(output) {
  return output
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// --- OPTIONS（プリフライト） ---
function doOptions(e) {
  return setCors(
    ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT)
  );
}

// --- GET（Next.js が叩く場合がある） ---
function doGet(e) {
  return setCors(
    ContentService.createTextOutput("Whiskers API OK")
      .setMimeType(ContentService.MimeType.TEXT)
  );
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

    // SHEET_ID が設定されていない場合はエラー
    if (SHEET_ID.includes('<<')) {
      return createResponse(false, 'GASエラー: SHEET_IDが設定されていません');
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return createResponse(false, 'シートが見つかりません: ' + SHEET_NAME);
    }

    const typeLabel = getTypeLabel(params.type || 'general');

    sheet.appendRow([
      new Date(),
      params.name,
      params.email,
      typeLabel,
      params.message,
      '未対応'
    ]);

    sendNotification({
      name: params.name,
      email: params.email,
      type: typeLabel,
      message: params.message
    });

    return createResponse(true, 'お問い合わせを受け付けました。');

  } catch (error) {
    console.error('Error:', error);
    return createResponse(false, 'エラーが発生しました: ' + error.message);
  }
}

// --- 共通レスポンス ---
function createResponse(success, message) {
  const output = ContentService
    .createTextOutput(JSON.stringify({ success, message }))
    .setMimeType(ContentService.MimeType.JSON);

  return setCors(output);
}

// --- メール通知 ---
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
${params.type}

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

// --- 種別ラベル変換 ---
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
