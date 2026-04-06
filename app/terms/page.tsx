import Header from "@/components/Header";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: '#f8f7f4' }}>
      <Header variant="light" />

      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* ページタイトル */}
          <div className="mb-12 pb-8" style={{ borderBottom: '1px solid #e8e6e1' }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1a1a18' }}>
              利用規約
            </h1>
            <p className="text-sm" style={{ color: '#8a8880' }}>最終更新日：2026年〇月〇日</p>
          </div>

          {/* 条文エリア */}
          <div className="space-y-10">

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第1条（目的）
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                本規約は、Whiskers（以下「本サービス」）の利用条件を定めるものです。
                ユーザーは、本規約に同意の上、本サービスを利用するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第2条（定義）
              </h2>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  「ユーザー」とは、本サービスを利用するすべての者をいいます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  「企業」とは、本サービスを通じてUGCを募集・採用する事業者をいいます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  「クリエイター」とは、本サービスを通じて作品を投稿する者をいいます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  「コンテスト」とは、企業が特定のテーマでUGCを募集する機能をいいます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  「採用」とは、企業がクリエイターの作品の利用権を購入することをいいます。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第3条（登録・アカウント）
              </h2>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  本サービスの利用には、アカウント登録が必要です。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  登録情報は正確かつ最新のものを入力してください。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  アカウント情報の管理責任はユーザーにあります。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  不正アクセスが判明した場合、直ちに運営にご連絡ください。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第4条（禁止事項）
              </h2>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  法令または公序良俗に違反する行為
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  他者の権利を侵害する行為（著作権、肖像権等）
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  虚偽の情報を登録・提供する行為
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  不正アクセスまたはその試み
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  サービスの運営を妨害する行為
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  未採用作品の無断利用
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第5条（作品の権利）
              </h2>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  投稿作品の著作権は、クリエイターに帰属します。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  企業が作品を採用した場合、利用規約に基づき利用権が付与されます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  利用権の範囲・期間は、各プランの定めに従います。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  採用前の作品を企業が無断で利用することを禁止します。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第6条（料金・決済）
              </h2>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  企業は、月額プランまたは追加採用に応じた料金を支払います。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  採用確定時に決済が行われます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  返金は、サービスに重大な欠陥がある場合を除き行いません。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第7条（報酬）
              </h2>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  採用されたクリエイターには、1作品あたり30,000円（税込）の報酬が支払われます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  報酬の支払いは、採用確定から5営業日以内に行われます。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  振込手数料はクリエイター負担となります。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第8条（免責事項）
              </h2>
              <ul className="space-y-2">
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  本サービスは、企業とクリエイターのマッチングプラットフォームを提供するのみであり、投稿作品の内容・品質を保証しません。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  企業とクリエイター間の紛争について、運営は関与しません（但し、規約違反の場合は除く）。
                </li>
                <li className="text-sm leading-relaxed flex gap-3" style={{ color: '#3d3d3a' }}>
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', marginTop: '8px' }} />
                  システムメンテナンスや障害による損害について、故意または重過失のない限り責任を負いません。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第9条（規約の変更）
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                本規約は、必要に応じて変更される場合があります。重要な変更がある場合は、本サービス上で告知します。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#1a1a18', borderLeft: '3px solid #f97316', paddingLeft: '12px' }}>
                第10条（準拠法・管轄裁判所）
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#3d3d3a', lineHeight: '1.9' }}>
                本規約は日本法に準拠し、本サービスに関する紛争は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

          </div>

          {/* フッターリンク */}
          <div className="mt-16 pt-8 flex gap-6" style={{ borderTop: '1px solid #e8e6e1' }}>
            <a href="/privacy" className="text-sm hover:underline" style={{ color: '#f97316' }}>
              プライバシーポリシー
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
