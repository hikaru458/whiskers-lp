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
    
    // メールアドレス形式チェック（TLDホワイトリスト方式）
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|jp|co\.jp|ne\.jp|or\.jp|go\.jp|ac\.jp|ed\.jp|io|ai|co|me|info|biz|dev)$/i;
    if (!emailRegex.test(params.email)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'メールアドレスの形式が正しくありません。'
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
    support: 'サポート・トラブル',
    privacy: 'プライバシーに関するお問い合わせ',
    other: 'その他'
  };
  return labels[type] || type;
}

/**
 * 作品採用時にクリエイターへ自動メール通知
 * @param {Object} params - 採用情報
 * @param {string} params.creatorEmail - クリエイターのメールアドレス
 * @param {string} params.creatorName - クリエイター名
 * @param {string} params.workTitle - 作品タイトル
 * @param {string} params.companyName - 企業名
 * @param {number} params.rewardAmount - 報酬額
 */
function notifyCreatorOfAdoption(params) {
  try {
    var subject = '【Whiskers】おめでとうございます！あなたの作品が採用されました';
    var body = params.creatorName + '様\n\n' +
      'Whiskersをご利用いただき、ありがとうございます。\n\n' +
      '━━━━━━━━━━━━━━━━━━━━\n' +
      '【採用のお知らせ】\n\n' +
      'あなたの作品「' + params.workTitle + '」が\n' +
      params.companyName + '様に採用されました！\n\n' +
      '【報酬】\n' +
      params.rewardAmount.toLocaleString() + '円（税込）\n\n' +
      '【次のステップ】\n' +
      '・報酬のお支払いは、採用確定から5営業日以内に行われます\n' +
      '・振込手数料はお客様負担となります\n' +
      '・お支払いに必要な情報は別途ご案内いたします\n' +
      '━━━━━━━━━━━━━━━━━━━━\n\n' +
      '今後ともWhiskersをよろしくお願いいたします。\n\n' +
      '※本メールは送信専用です。ご返信いただいてもお答えできません。\n' +
      '※お問い合わせはサイトのお問い合わせフォームよりお願いいたします。';
    
    GmailApp.sendEmail(params.creatorEmail, subject, body);
    return { success: true };
  } catch (err) {
    console.error('メール送信エラー: ' + err.toString());
    return { success: false, error: err.toString() };
  }
}

/**
 * 作品採用API（企業側から呼び出し）
 */
function doPostAdoption(e) {
  try {
    var params = e.parameter;
    
    // 必須項目チェック
    if (!params.creatorEmail || !params.creatorName || !params.workTitle || !params.companyName) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: '必須項目が不足しています。'
      }));
    }
    
    // 報酬額（デフォルト30,000円）
    var rewardAmount = parseInt(params.rewardAmount) || 30000;
    
    // クリエイターへ通知メール送信
    var result = notifyCreatorOfAdoption({
      creatorEmail: params.creatorEmail,
      creatorName: params.creatorName,
      workTitle: params.workTitle,
      companyName: params.companyName,
      rewardAmount: rewardAmount
    });
    
    if (!result.success) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'メール送信に失敗しました: ' + result.error
      }));
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '採用通知メールを送信しました。'
    }));
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'エラー: ' + err.toString()
    }));
  }
}
