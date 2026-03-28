# Whiskers お問い合わせフォーム - Google Sheets連携手順

## 概要
サイトのお問い合わせフォームからデータを自動でGoogle Sheetsに保存します。

---

## 手順1: Google Sheetsを作成

1. Google Driveで新しいスプレッドシートを作成
2. シート名を「お問い合わせ」に変更
3. 1行目に以下のヘッダーを入力:

```
日時 | 種別 | 名前 | 会社/SNS | メール | 種別詳細 | 内容 | ステータス
```

---

## 手順2: Google Apps Scriptを設定

1. メニューから **拡張機能 → Apps Script** を選択
2. 以下のコードを貼り付け:

```javascript
function doPost(e) {
  try {
    // CORSヘッダー設定
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    
    // プリフライトリクエスト対応
    if (e.parameter.method === "OPTIONS") {
      return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers);
    }
    
    // パラメータ取得
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // データ追加
    sheet.appendRow([
      new Date(),           // 日時
      data.type,            // 種別（ブランド/クリエイター）
      data.name,            // 名前
      data.company,         // 会社名/SNS名
      data.email,           // メール
      data.category,        // 問い合わせ種別
      data.message,         // 内容
      "未対応"              // ステータス
    ]);
    
    // 成功レスポンス
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "message": "データを保存しました"
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch (error) {
    // エラーレスポンス
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "message": error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*"
    });
  }
}

// GETリクエスト用（テスト）
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "result": "success",
    "message": "API is working"
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders({
    "Access-Control-Allow-Origin": "*"
  });
}
```

3. **保存** をクリック（プロジェクト名: WhiskersForm）

---

## 手順3: ウェブアプリとしてデプロイ

1. メニューから **デプロイ → 新しいデプロイ** を選択
2. 種類を **ウェブアプリ** に変更
3. 以下の設定:
   - **説明**: Whiskers Contact Form API
   - **Webアプリとして実行**: 自分（メールアドレス）
   - **アクセスできるユーザー**: 全員
4. **デプロイ** をクリック
5. **承認** → **このプロジェクトは検証されていません** → **詳細** → **（不安全）を許可**
6. **ウェブアプリのURL** をコピー（後で使います）

```
例: https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec
```

---

## 手順4: サイトの環境変数に設定

### 方法A: フロントエンドに直接埋め込む（簡単）

`app/contact/page.tsx` の `GOOGLE_SCRIPT_URL` を書き換え:

```typescript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec";
```

### 方法B: Vercel環境変数（推奨）

1. Vercelダッシュボード → プロジェクト設定 → Environment Variables
2. 追加:
   - Name: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - Value: `https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec`
3. リデプロイ

---

## 手順5: テスト

1. サイトのお問い合わせページを開く
2. フォームに入力して送信
3. Google Sheetsにデータが追加されることを確認

---

## トラブルシューティング

### CORSエラーが出る場合
- Apps Scriptの再デプロイ（バージョンを新しく）
- 「アクセスできるユーザー」が「全員」になっているか確認

### データが保存されない場合
- スプレッドシートの編集権限を確認
- Apps Scriptの実行ログを確認（表示 → 実行ログ）

### 日本語が文字化けする場合
- 通常は問題ありません
- 発生した場合は `e.postData.contents` の前後でエンコーディングを確認

---

## セキュリティ注意

⚠️ **Apps Script URLは公開されますが、以下の対策で安全を確保**:

1. Google Sheetsは自分だけが閲覧可能に設定
2. 送信元ドメインを制限する場合（上級者向け）:
   - `doPost` 内で `e.parameter.origin` をチェック
   - Vercelのドメインのみ許可

---

## 次のステップ

- 毎日Sheetsをチェックして返信対応
- 対応済みの行は「ステータス」列を「対応済み」に変更
- 自動通知メールを追加したい場合は、Apps Scriptに `MailApp.sendEmail` を追加

---

*最終更新: 2024年XX月XX日*
