/**
 * Whiskers お問い合わせフォーム - Google Apps Script（シンプル版）
 */

const SHEET_ID = '1E4nkcGkcSzTJ-WsvZo8L5Cx33GqvGiu3FGEC-0uBDT8';
const SHEET_NAME = 'お問い合わせ';

function doPost(e) {
  try {
    var params = e.parameter;
    
    // バリデーション
    if (!params.name || !params.email || !params.message) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: '必須項目が入力されていません。'
      }));
    }
    
    // スプレッドシートに書き込み
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    var typeLabel = getTypeLabel(params.type || 'general');
    
    sheet.appendRow([
      new Date(),
      params.name,
      params.email,
      typeLabel,
      params.message,
      '未対応'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'お問い合わせを受け付けました。'
    }));
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'エラー: ' + err.toString()
    }));
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Whiskers API OK');
}

function getTypeLabel(type) {
  var labels = {
    general: '一般的なお問い合わせ',
    business: '企業様向けお問い合わせ',
    creator: 'クリエイター様向けお問い合わせ',
    media: '取材・メディア関連',
    other: 'その他'
  };
  return labels[type] || type;
}
