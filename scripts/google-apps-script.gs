/**
 * Whiskers お問い合わせフォーム - Google Apps Script
 * 
 * 使用方法:
 * 1. Google Spreadsheetを作成し、「お問い合わせ」シートを作成
 * 2. ヘッダー行に「タイムスタンプ」「お名前」「メールアドレス」「お問い合わせ種別」「メッセージ」「ステータス」を設定
 * 3. 拡張機能 > Apps Scriptでこのコードを貼り付け
 * 4. デプロイ > 新しいデプロイ > ウェブアプリとして実行
 *    - 実行ユーザ: 自分
 *    - アクセスできるユーザ: すべてのユーザ
 * 5. ウェブアプリURLをコピーしてNext.jsの環境変数に設定
 */

const SHEET_NAME = 'お問い合わせ';

// CORS対応
function doOptions(e) {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doPost(e) {
  try {
    // パラメータ取得
    const params = e.parameter;
    
    // バリデーション
    if (!params.name || !params.email || !params.message) {
      return createResponse(false, '必須項目が入力されていません。');
    }
    
    // メール形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      return createResponse(false, 'メールアドレスの形式が正しくありません。');
    }
    
    // スプレッドシートに記録
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return createResponse(false, 'シートが見つかりません: ' + SHEET_NAME);
    }
    
    // 新しい行に追加
    sheet.appendRow([
      new Date(),                              // タイムスタンプ
      params.name,                             // お名前
      params.email,                            // メールアドレス
      params.type || 'general',                // お問い合わせ種別
      params.message,                          // メッセージ
      '未対応'                                 // ステータス
    ]);
    
    // メール通知（オプション）
    sendNotification(params);
    
    return createResponse(true, 'お問い合わせを受け付けました。');
    
  } catch (error) {
    console.error('Error:', error);
    return createResponse(false, 'エラーが発生しました: ' + error.message);
  }
}

// レスポンス作成（CORS対応）
function createResponse(success, message) {
  const output = JSON.stringify({
    success: success,
    message: message
  });
  
  return ContentService.createTextOutput(output)
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*'
    });
}

// メール通知（オプション機能）
function sendNotification(params) {
  try {
    const recipient = 'your-email@example.com'; // 通知先メールアドレス
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

// 種別ラベル変換
function getTypeLabel(type) {
  const labels = {
    'general': '一般的なお問い合わせ',
    'business': '企業様向けお問い合わせ',
    'creator': 'クリエイター様向けお問い合わせ',
    'media': '取材・メディア関連',
    'other': 'その他'
  };
  return labels[type] || type;
}

// テスト用関数
function testDoPost() {
  const e = {
    parameter: {
      name: 'テスト太郎',
      email: 'test@example.com',
      type: 'general',
      message: 'これはテストメッセージです。'
    }
  };
  const result = doPost(e);
  console.log(result.getContent());
}
