# 🐾 Whiskers MVP仕様（完全版・最終確定稿）

**最終更新：2026/04**

---

## 1. プロダクト概要

Whiskers は、企業がコンテスト形式でUGCを募集し、
クリエイターが投稿した作品を企業が採用し、
利用権を購入できる UGC選考プラットフォーム。

---

## 2. MVPの目的

最小の機能で「企業がUGCを採用できる状態」を成立させること。

---

## 3. MVPで実装する機能（Must）

### 企業側

| 機能 | 内容 |
|------|------|
| アカウント登録（メール＋PW） | 基本認証 |
| コンテスト作成（タイトル・説明・締切） | コンテスト管理 |
| 投稿一覧の閲覧（低画質＋ウォーターマーク） | セキュリティ対応 |
| 投稿詳細 | 個別閲覧 |
| 採用ボタン（採用確定日を記録） | コア機能 |
| 採用作品の原本ダウンロード（署名付きURL・24h） | セキュリティ対応 |
| 利用権期間の自動計算（ライト/1年/3年） | 自動化 |
| Stripe Billing による月額課金（自動決済） | 決済機能 |
| Stripe Checkout による追加採用の即時決済 | 決済機能 |

### クリエイター側

| 機能 | 内容 |
|------|------|
| アカウント登録 | 基本認証 |
| プロフィール編集 | 情報管理 |
| 投稿（画像/動画＋説明文） | コア機能 |
| 投稿履歴 | 管理機能 |
| 採用通知（メール） | 通知機能 |
| 報酬受取口座登録 | 決済準備 |

### 運営側

| 機能 | 内容 |
|------|------|
| 採用管理（pending/paid） | ステータス管理 |
| 報酬支払い管理（手動振込） | 運営機能 |
| 規約違反投稿の削除 | モデレーション |
| 企業の課金状況確認（Stripe Dashboard） | 監視機能 |

---

## 4. 決済仕様（完全版）

### Stripe Billing（サブスク）

- 月額プランの自動課金
- 領収書自動発行
- カード登録必須
- 手数料は企業負担
- Webhookで状態管理

### Webhookイベント

| イベント | 意味 | Whiskers側の処理 |
|----------|------|------------------|
| invoice.payment_failed | 月額未払い | plan.status = suspended、新規採用不可 |
| customer.subscription.deleted | 解約 | ライトは即時停止、コンテスト自動クローズ |
| customer.subscription.updated | プラン変更 | plan_type 更新 |

### Stripe Checkout（追加採用）

- 採用ボタン → Checkout
- Checkout 完了時に採用確定
- Webhook `checkout.session.completed` で adoptions 作成

---

## 5. 利用権仕様（完全版）

| プラン | 利用権期間 | 契約終了後 |
|--------|------------|----------|
| ライト | 契約期間中のみ | 新規利用不可 / SNS残存OK / LP等は30日以内差し替え |
| スタンダード | 採用日＋1年 | 期間満了後は新規利用不可 |
| プロ | 採用日＋3年 | 同上 |

---

## 6. 採用上限（完全版）

| プラン | 採用上限 |
|--------|----------|
| ライト | 月3件 |
| スタンダード | 月10件 |
| プロ | 無制限 |

### 月次カウント（JST基準・バグ対策済み）

```sql
SELECT COUNT(*) 
FROM adoptions
WHERE company_id = :company_id
AND (adopted_at AT TIME ZONE 'Asia/Tokyo') >= DATE_TRUNC('month', NOW() AT TIME ZONE 'Asia/Tokyo')
AND (adopted_at AT TIME ZONE 'Asia/Tokyo') < DATE_TRUNC('month', NOW() AT TIME ZONE 'Asia/Tokyo') + INTERVAL '1 month';
```

---

## 7. suspended企業の扱い（完全版）

`plans.status = 'suspended'` の場合：

- 既存の採用済み作品の利用権（expires_at）は維持
- 新規採用不可
- 新規利用不可
- 進行中のコンテストは自動クローズ
- 企業と投稿者にメール通知

---

## 8. セキュリティ仕様（完全版）

- 未採用作品は低画質サムネイル＋ウォーターマーク
- 原本DLは採用後のみ
- 署名付きURL（24時間有効）
- 企業は未採用作品を保存不可
- 投稿ステータス（active / deleted / under_review）
- EXIFメタデータはアップロード時に削除

---

## 9. ウォーターマーク処理（技術リスク対応済み）

### ✔ 最優先で技術検証（PoC）を実施

フェーズ1の最初の1週間で以下を検証：

- Next.js API Route + Sharp
- Vercel Serverless の制限
- Edge Runtime の非対応状況

**動作が不安定な場合は即座に外部サービスへ切り替える。**

### ✔ 代替案の優先順位

1. **Cloudflare Images（最優先）**
2. ImageKit
3. Supabase Storage + 外部変換API
4. Next.js API Route（Sharp）※成功率低

---

## 10. データ構造（完全版）

### users

- id
- role
- name
- email
- sns
- bank_account
- created_at

### plans（新規）

- id
- company_id
- plan_type
- stripe_subscription_id
- status（active/suspended/canceled）
- current_period_end
- created_at

### contests

- id
- company_id
- title
- description
- deadline
- created_at

### posts

- id
- contest_id
- creator_id
- media_url
- description
- status
- created_at

### adoptions

- id
- post_id
- company_id
- plan_type
- adopted_at
- expires_at
- payout_status
- created_at

---

## 11. 報酬仕様（完全版）

- 採用1件につき **30,000円（税込）**
- 採用確定日から**5営業日以内** に振込
- 振込手数料はクリエイター負担

**MVP後、月30件超で Stripe Connect に移行**
（根拠：1件3分 × 30件 = 90分が運用限界）

---

## 12. 開発ロードマップ（3ヶ月）

### フェーズ1（1ヶ月）

- ウォーターマーク処理のPoC（最優先）
- 認証
- 投稿
- 閲覧（低画質＋ウォーターマーク）
- 投稿ステータス

### フェーズ2（2ヶ月）

- 採用
- 利用権期間
- 原本DL
- 採用通知

### フェーズ3（3ヶ月）

- Stripe Billing
- Stripe Checkout
- 報酬管理
- 運営画面

---

## 13. MVP成功基準（成立ベース）

- ✅ 企業1社が実際にコンテストを開催
- ✅ クリエイター10名以上が投稿
- ✅ 企業が1作品以上を採用
- ✅ 報酬が1件以上支払われる

これが成立すれば、Whiskersはプロダクトとして成立。

---

*最終更新日：2026年4月*
