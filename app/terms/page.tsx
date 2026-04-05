"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import Header from "@/components/Header";

const WhiskersBackground = dynamic(
  () => import("@/components/WhiskersBackground"),
  { ssr: false }
);

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-y-auto" style={{ willChange: 'transform' }}>
      {/* 3D Background - positioned behind content */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <WhiskersBackground />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header - LP Design */}
        <Header />

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            利用規約
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-white/60 text-center mb-12">
              最終更新日：2026年〇月〇日
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第1条（目的）</h2>
              <p className="text-white/80 leading-relaxed">
                本規約は、Whiskers（以下「本サービス」）の利用条件を定めるものです。
                ユーザーは、本規約に同意の上、本サービスを利用するものとします。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第2条（定義）</h2>
              <div className="space-y-2 text-white/80">
                <p>「ユーザー」とは、本サービスを利用するすべての者をいいます。</p>
                <p>「企業」とは、本サービスを通じてUGCを募集・採用する事業者をいいます。</p>
                <p>「クリエイター」とは、本サービスを通じて作品を投稿する者をいいます。</p>
                <p>「コンテスト」とは、企業が特定のテーマでUGCを募集する機能をいいます。</p>
                <p>「採用」とは、企業がクリエイターの作品の利用権を購入することをいいます。</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第3条（登録・アカウント）</h2>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>本サービスの利用には、アカウント登録が必要です。</li>
                <li>登録情報は正確かつ最新のものを入力してください。</li>
                <li>アカウント情報の管理責任はユーザーにあります。</li>
                <li>不正アクセスが判明した場合、直ちに運営にご連絡ください。</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第4条（禁止事項）</h2>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>法令または公序良俗に違反する行為</li>
                <li>他者の権利を侵害する行為（著作権、肖像権等）</li>
                <li>虚偽の情報を登録・提供する行為</li>
                <li>不正アクセスまたはその試み</li>
                <li>サービスの運営を妨害する行為</li>
                <li>未採用作品の無断利用</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第5条（作品の権利）</h2>
              <div className="space-y-4 text-white/80">
                <p>1. 投稿作品の著作権は、クリエイターに帰属します。</p>
                <p>2. 企業が作品を採用した場合、利用規約に基づき利用権が付与されます。</p>
                <p>3. 利用権の範囲・期間は、各プランの定めに従います。</p>
                <p>4. 採用前の作品を企業が無断で利用することを禁止します。</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第6条（料金・決済）</h2>
              <div className="space-y-4 text-white/80">
                <p>1. 企業は、月額プランまたは追加採用に応じた料金を支払います。</p>
                <p>2. 採用確定時に決済が行われます。</p>
                <p>3. 返金は、サービスに重大な欠陥がある場合を除き行いません。</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第7条（報酬）</h2>
              <div className="space-y-4 text-white/80">
                <p>1. 採用されたクリエイターには、1作品あたり30,000円（税込）の報酬が支払われます。</p>
                <p>2. 報酬の支払いは、採用確定から5営業日以内に行われます。</p>
                <p>3. 振込手数料はクリエイター負担となります。</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第8条（免責事項）</h2>
              <div className="space-y-4 text-white/80">
                <p>1. 本サービスは、企業とクリエイターのマッチングプラットフォームを提供するのみであり、投稿作品の内容・品質を保証しません。</p>
                <p>2. 企業とクリエイター間の紛争について、運営は関与しません（但し、規約違反の場合は除く）。</p>
                <p>3. システムメンテナンスや障害による損害について、故意または重過失のない限り責任を負いません。</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第9条（規約の変更）</h2>
              <p className="text-white/80">
                本規約は、必要に応じて変更される場合があります。重要な変更がある場合は、本サービス上で告知します。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-orange-400">第10条（準拠法・管轄裁判所）</h2>
              <p className="text-white/80">
                本規約は日本法に準拠し、本サービスに関する紛争は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            {/* Footer removed - back button in header */}
          </div>
        </div>
      </div>
    </div>
  );
}
