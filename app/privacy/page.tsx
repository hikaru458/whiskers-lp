import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: '#f8f7f4' }}>
      <Header variant="light" />

      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* ページタイトル */}
          <div className="mb-12 pb-8" style={{ borderBottom: '1px solid #e8e6e1' }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1a1a18' }}>
              プライバシーポリシー
            </h1>
            <p className="text-sm" style={{ color: '#8a8880' }}>最終更新日：2026年〇月〇日</p>
          </div>

          {/* 前文 */}
          <p className="text-sm leading-relaxed mb-10" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
            Whiskers（以下「当サービス」）は、ユーザーの個人情報を適切に取り扱うことを重要な責務と考え、
            「個人情報の保護に関する法律」（以下「個情法」）その他関連法令に基づき、
            以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
          </p>

          {/* 条文エリア */}
          <div className="space-y-10">

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                1. 収集する情報
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>当サービスは、以下の情報を取得します。</p>
              
              <h3 className="text-sm font-medium mb-2" style={{ color: '#1a1a18' }}>（1）ユーザーが登録時に提供する情報</h3>
              <ul className="space-y-1 mb-4">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />氏名またはニックネーム
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />メールアドレス
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />パスワード
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />SNSアカウント（任意）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />プロフィール情報（自己紹介、スキル等）
                </li>
              </ul>

              <h3 className="text-sm font-medium mb-2" style={{ color: '#1a1a18' }}>（2）クリエイターが投稿する情報</h3>
              <ul className="space-y-1 mb-4">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />画像・動画・文章などのコンテンツ
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />撮影データ（メタデータを含む場合があります）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />作品に関する説明文
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />企業からの依頼に基づく制作物
                </li>
              </ul>

              <h3 className="text-sm font-medium mb-2" style={{ color: '#1a1a18' }}>（3）企業が提供する情報</h3>
              <ul className="space-y-1 mb-4">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />企業名・担当者名
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />連絡先（メールアドレス等）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />コンテスト情報・依頼内容
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />採用作品の利用目的
                </li>
              </ul>

              <h3 className="text-sm font-medium mb-2" style={{ color: '#1a1a18' }}>（4）利用状況に関する情報</h3>
              <ul className="space-y-1 mb-4">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />IPアドレス
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />Cookie
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />端末情報
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />アクセスログ
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />利用日時・操作履歴
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />投稿数・採用数などの利用データ
                </li>
              </ul>

              <h3 className="text-sm font-medium mb-2" style={{ color: '#1a1a18' }}>（5）決済情報</h3>
              <ul className="space-y-1">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />決済サービス事業者を通じて取得する決済状況（※クレジットカード番号等は当サービスでは保持しません）
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                2. 個人情報の利用目的（個情法21条対応）
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>当サービスは、取得した情報を以下の目的で利用します。</p>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />サービス提供・アカウント管理のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />企業とクリエイターのマッチング・選考のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />投稿作品の審査・掲載・利用権付与のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />利用料金の請求・決済処理のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />不正行為・規約違反の防止のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />ステマ規制・著作権法・景品表示法など法令遵守のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />サービス改善・新機能開発のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />お問い合わせ対応のため
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />利用状況の分析・統計データの作成のため（※統計データは個人を特定しない形で利用します）
                </li>
              </ul>
              <p className="text-sm mt-4" style={{ color: '#8a8880' }}>
                ■ 利用目的の通知方法：ユーザーは、登録時に本ポリシーに同意することで、個情法21条に基づく利用目的の通知が完了したものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                3. 作品データの取り扱い（UGC特有の規定）
              </h2>
              <ul className="space-y-3">
                <li className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                  <strong style={{ color: '#1a1a18' }}>（1）投稿作品の権利：</strong>投稿作品の著作権はクリエイターに帰属します。企業が採用した作品については、利用規約に基づき企業に利用権を付与します。
                </li>
                <li className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                  <strong style={{ color: '#1a1a18' }}>（2）AIによる自動チェック：</strong>不適切コンテンツ（暴力・アダルト・著作権侵害等）を検出するため、AIによる自動解析を行う場合があります。
                </li>
                <li className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                  <strong style={{ color: '#1a1a18' }}>（3）ステマ規制への対応：</strong>企業が採用した作品を広告として利用する場合、「PR」「広告」「提供：企業名」などの表記が必要です。当サービスは広告表記の有無を自動チェックし、不備がある場合は通知します。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                4. 個人情報の第三者提供
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>当サービスは、以下の場合を除き、個人情報を第三者に提供しません。</p>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />本人の同意がある場合
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />法令に基づく場合
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />企業がクリエイターの作品を採用した場合（提供する情報：氏名または活動名、メールアドレス、報酬支払いに必要な口座情報、作品データ、プロフィール情報）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />決済事業者に決済情報を提供する場合
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />不正行為・法令違反の調査のために必要な場合
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                5. 個人情報の管理
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>当サービスは、個人情報の漏洩・紛失・改ざんを防止するため、以下の安全管理措置を講じます。</p>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />通信の暗号化（HTTPS）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />パスワードのハッシュ化
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />アクセス権限の制限
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />ログ監視
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />外部委託先の管理・監督
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />データバックアップ
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                6. Cookie（クッキー）等の利用と同意取得
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>当サービスは、以下の目的でCookieを使用します。</p>
              <ul className="space-y-2 mb-4">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />ログイン状態の維持
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />利用状況の分析
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />サービス改善
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />不正アクセス防止
                </li>
              </ul>
              <p className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>初回アクセス時にCookieバナーを表示し、「同意する／拒否する」を選択できるようにします。拒否した場合、一部機能が利用できない場合があります。</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                7. 外部サービス・越境データ移転（個情法24条対応）
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>当サービスは以下の外部サービスを利用する場合があります。</p>
              <ul className="space-y-2 mb-4">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />AWS / GCP / Supabase（海外サーバーを含む）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />Stripe（決済）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />Google Analytics（解析）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />OAuth（認証）
                </li>
              </ul>
              <p className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>これらのサービスは海外（特に米国）にサーバーを持つ場合があり、個人情報が外国に移転される可能性があります。当サービスは、個情法24条に基づき、適切な保護措置を講じています。</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                8. 個人情報の保存期間（個情法19条対応）
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>当サービスは、利用目的に必要な範囲を超えて個人情報を保管しません。</p>
              <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #e8e6e1' }}>
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ background: '#f8f7f4', borderBottom: '1px solid #e8e6e1' }}>
                      <th className="py-3 px-4 text-sm font-medium" style={{ color: '#1a1a18' }}>情報の種類</th>
                      <th className="py-3 px-4 text-sm font-medium" style={{ color: '#1a1a18' }}>保存期間</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e8e6e1' }}>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>アカウント情報</td>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>退会後 2年間</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e8e6e1' }}>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>投稿作品（未採用）</td>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>コンテスト終了後 6ヶ月</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e8e6e1' }}>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>投稿作品（採用）</td>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>企業の利用権期間に準ずる</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e8e6e1' }}>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>アクセスログ</td>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>1年間</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>決済情報</td>
                      <td className="py-3 px-4 text-sm" style={{ color: '#3d3d3a' }}>法令に基づき 7年間（会計帳簿）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                9. 個人情報の開示・訂正・削除（対応期限明記）
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>ユーザーは以下の請求を行うことができます。</p>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />自身の個人情報の開示
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />訂正・追加・削除
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />利用停止・消去
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />第三者提供の停止
                </li>
              </ul>
              <p className="text-sm mt-4" style={{ color: '#8a8880' }}>■ 対応期限：本人確認後、原則30日以内に対応します。</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                10. 未成年ユーザーの利用（報酬受領の特則）
              </h2>
              <ul className="space-y-3">
                <li className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                  <strong style={{ color: '#1a1a18' }}>18歳未満のユーザー：</strong>保護者の同意を得た上で利用してください。報酬を受け取る場合は、保護者の同意書を必須とします。
                </li>
                <li className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                  <strong style={{ color: '#1a1a18' }}>同意書の取得方法：</strong>電子署名による同意書提出、保護者のメールアドレスによる承認、または当サービスが指定するフォームでの同意手続きが必要です。
                </li>
                <li className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                  <strong style={{ color: '#1a1a18' }}>13歳未満のユーザー：</strong>当サービスは13歳未満の利用を原則として認めていません。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                11. プライバシーポリシーの変更
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                本ポリシーの内容は、必要に応じて変更される場合があります。重要な変更がある場合は、当サービス上で告知します。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                12. お問い合わせ窓口（対応期限明記）
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>プライバシーに関するお問い合わせは、以下までご連絡ください。</p>
              <div className="space-y-2">
                <p className="text-sm" style={{ color: '#3d3d3a' }}>・ （メールアドレス）</p>
                <p className="text-sm" style={{ color: '#3d3d3a' }}>・ （運営者名）</p>
                <p className="text-sm" style={{ color: '#3d3d3a' }}>・ （所在地：バーチャルオフィス等、公開可能な住所を記載）</p>
              </div>
              <p className="text-sm mt-4" style={{ color: '#8a8880' }}>■ 対応期限：お問い合わせには 5営業日以内に回答します。</p>
            </section>

          </div>

          {/* フッターリンク */}
          <div className="mt-16 pt-8 flex gap-6" style={{ borderTop: '1px solid #e8e6e1' }}>
            <a href="/terms" className="text-sm hover:underline" style={{ color: '#f97316' }}>
              利用規約
            </a>
            <a href="/contact" className="text-sm hover:underline" style={{ color: '#f97316' }}>
              お問い合わせ
            </a>
            <a href="/" className="text-sm hover:underline" style={{ color: '#8a8880' }}>
              ← トップページに戻る
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
