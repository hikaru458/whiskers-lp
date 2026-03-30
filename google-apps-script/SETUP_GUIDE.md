# Whiskers お問い合わせフォーム - GAS セットアップガイド

## 概要
お問い合わせフォームのデータをGoogleスプレッドシートに自動保存するための設定手順です。

---

## 手順1: Googleスプレッドシートの作成

1. [Googleスプレッドシート](https://sheets.new) を作成
2. ファイル名: `Whiskers_お問い合わせ管理`
3. シート名はデフォルトの「シート1」のままでOK

---

## 手順2: Google Apps Scriptの設定

1. スプレッドシートのメニューから **「拡張機能」>「Apps Script」** を選択
2. 新しいプロジェクトが開いたら、デフォルトの `コード.gs` を削除
3. 新しいファイルを作成し、`Code.gs` という名前で保存
4. `Code.gs` の内容を以下のコードで置き換え：

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // ヘッダー行がない場合は作成
    if (sheet.getRange(1, 1).getValue() === "") {
      const headers = [
        "タイムスタンプ", "タイプ", "お名前", "会社名/SNSアカウント",
        "メールアドレス", "お問い合わせ種別", "お問い合わせ内容", "ステータス"
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#ff6b35")
        .setFontColor("white");
    }
    
    // データを追加
    const rowData = [
      new Date(),
      data.type === "brand" ? "企業様" : "クリエイター様",
      data.name || "",
      data.company || "",
      data.email || "",
      data.category || "",
      data.message || "",
      "未対応"
    ];
    
    sheet.appendRow(rowData);
    
    // 成功レスポンス
    var output = ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "お問い合わせを受け付けました"
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    output.setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    });
    return output;
    
  } catch (error) {
    var output = ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    output.setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    });
    return output;
  }
}

function doOptions(e) {
  var output = ContentService.createTextOutput(JSON.stringify({}));
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  return output;
}
```

---

## 手順3: Webアプリとしてデプロイ

1. Apps Scriptのメニューで **「デプロイ」>「新しいデプロイ」** を選択
2. 「種類を選択」で **「Webアプリ」** をクリック
3. 設定:
   - **説明**: `Whiskers問い合わせフォーム連携`
   - **Webアプリとして実行**: `自分`
   - **アクセスできるユーザー**: `すべて`
4. 「デプロイ」をクリック
5. 認可が求められたら、**「許可する」**
6. デプロイ後に表示される **URL** をコピー（後で使用します）

⚠️ **重要**: 「アクセスできるユーザー」は必ず **「すべて」** にしてください。

---

## 手順4: Vercel環境変数の設定

1. [Vercelダッシュボード](https://vercel.com/dashboard) にログイン
2. `whiskers-lp` プロジェクトを選択
3. **「Settings」>「Environment Variables」** を開く
4. 新しい環境変数を追加:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: 手順3でコピーしたGASのURL
5. 「Save」をクリック
6. プロジェクトを再デプロイ（または数分待って自動反映）

---

## 手順5: 動作確認

1. https://whiskers-lp.vercel.app/contact にアクセス
2. テストデータでフォーム送信
3. スプレッドシートにデータが保存されることを確認

---

## トラブルシューティング

### 「GASが設定されていません」警告が表示される
→ 環境変数が正しく設定されているか確認してください

### 送信時にエラーになる
→ Apps Scriptのデプロイ設定で「アクセスできるユーザー」が「すべて」になっているか確認

### データがスプレッドシートに保存されない
→ Apps Scriptの実行ログ（「実行」タブ）でエラーを確認

---

## 補足: メール通知機能（オプション）

GASに以下の関数を追加すると、新規問い合わせ時にメール通知を受け取れます：

```javascript
function sendNotificationEmail(data) {
  const recipient = "hello@whiskers.jp"; // 通知先メールアドレスを変更
  const subject = `【Whiskers】新規お問い合わせ: ${data.name}様`;
  const body = `
新しいお問い合わせが届きました。

タイプ: ${data.type === "brand" ? "企業様" : "クリエイター様"}
お名前: ${data.name}
メール: ${data.email}
カテゴリ: ${data.category}

内容:
${data.message}

---
スプレッドシートで確認してください。
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
```

doPost関数内の成功レスポンス前に `sendNotificationEmail(data);` を追加してください。
