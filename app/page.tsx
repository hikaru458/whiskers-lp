"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Header from "@/components/Header";
import PhotoPanel from "@/components/PhotoPanel";
import FadeInSection from "@/components/FadeInSection";
import GlassPhotoPanel from "@/components/GlassPhotoPanel";
import WhiskersBackground from "@/components/WhiskersBackground";

// 6セクションのデータ
const SECTIONS = [
  {
    image: "/images/image_fx_0.jpg",
    title: "Gallery",
    description: "クリエイターの作品が集まる場所。あなたの感性に触れる一枚を見つけてください。",
  },
  {
    image: "/images/image_fx_1.jpg",
    title: "Creator",
    description: "個性豊かなクリエイターたちが活躍する舞台。新しい才能との出会いが待っています。",
  },
  {
    image: "/images/image_fx_2.jpg",
    title: "Contest",
    description: "コンテストで才能を競い合う。賞金と名誉を手に入れよう。",
  },
  {
    image: "/images/juno_0.png",
    title: "Product",
    description: "クリエイターに寄り添うツールとサービス。創作をもっと自由に。",
  },
  {
    image: "/images/juno_1.png",
    title: "FAQ",
    description: "よくある質問と回答。ご不明点があればお気軽にお問い合わせください。",
  },
  {
    image: "/images/juno_2.png",
    title: "Contact",
    description: "お問い合わせはこちらから。クリエイターとユーザー、双方の声をお待ちしています。",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen text-white relative">
      {/* 3D背景シーン */}
      <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            alpha: false,          // ★ 透明キャンバスを禁止（最重要）
          }}
          style={{ width: "100vw", height: "100vh" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 1); // ★ 不透明クリア（透明タイル完全消滅）
          }}
        >
          <ambientLight intensity={0.5} />
          <WhiskersBackground />
        </Canvas>
      </div>

      {/* ヘッダー */}
      <Header />

      {/* Heroセクション */}
      <section id="hero" className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
          Whiskers
        </h1>
        <p className="text-lg md:text-xl text-white/80 text-center max-w-2xl">
          企業とクリエイターをつなぐ<br />コンテスト型UGCプラットフォーム
        </p>
      </section>

      {/* サービスの仕組み */}
      <section id="how-it-works" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Whiskersの仕組み
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">コンテスト開催</h3>
                <p className="text-sm text-white/70">企業がコンテストを開催し、クリエイターに作品を募集します</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">作品投稿</h3>
                <p className="text-sm text-white/70">クリエイターが作品を投稿。フォロワー数に関係なく実力で評価されます</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">採用・利用権付与</h3>
                <p className="text-sm text-white/70">企業が気に入った作品を採用し、利用権が付与されます</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 6セクション - PC版 */}
      <div className="hidden md:block">
        {SECTIONS.map((section, index) => {
          const isEven = index % 2 === 0;
          const isReversed = !isEven;

          return (
            <section
              key={`pc-${section.title}`}
              id={`pc-${section.title.toLowerCase()}`}
              className="relative z-10 h-screen flex items-center py-20 px-6"
            >
              <div className="max-w-6xl mx-auto w-full">
                <FadeInSection delay={index * 100}>
                  <GlassPhotoPanel
                    imageSrc={section.image}
                    title={section.title}
                    description={section.description}
                    imagePosition={isReversed ? "right" : "left"}
                  />
                </FadeInSection>
              </div>
            </section>
          );
        })}
      </div>

      {/* スマホ版: 通常スクロール */}
      <div className="md:hidden">
        {SECTIONS.map((section, index) => {
          const isEven = index % 2 === 0;
          const isReversed = !isEven;

          return (
            <section
              key={`mobile-${section.title}`}
              id={`sp-${section.title.toLowerCase()}`}
              className="relative z-10 min-h-[100svh] flex items-center py-20 px-6"
            >
              <div className="max-w-6xl mx-auto w-full">
                <FadeInSection delay={index * 100}>
                  <PhotoPanel
                    imageSrc={section.image}
                    title={section.title}
                    description={section.description}
                    imagePosition={isReversed ? "right" : "left"}
                  />
                </FadeInSection>
              </div>
            </section>
          );
        })}
      </div>

      {/* 企業向けセクション */}
      <section id="business" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
              企業様向け
            </h2>
            <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
              広告費を抑えて、確実に使えるUGCを獲得。
              フォロワー数に関係なく、実力で選考します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">選考制で品質担保</h3>
                <p className="text-white/60">たくさんの投稿の中から気に入った作品だけを採用。品質が不安定な依頼型とは異なり、納得のいく作品だけに課金します。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">ステマ規制対応済み</h3>
                <p className="text-white/60">2023年10月施行の景品表示法改正に対応。広告表記の自動チェック機能で、法的リスクを軽減します。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">成果物ベースの課金</h3>
                <p className="text-white/60">投稿数は無制限。採用した作品だけに費用が発生するため、予算を無駄にしません。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">多様な業種に対応</h3>
                <p className="text-white/60">美容、食品、EC、アパレルなど業種を問わず活用可能。商品・サービスを持つすべての企業が対象です。</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 料金プラン */}
      <section id="pricing" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
              料金プラン
            </h2>
            <p className="text-lg text-white/60 text-center mb-12 max-w-2xl mx-auto">
              投稿数は無制限。採用した作品だけに費用が発生します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ライト */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                <div className="text-sm font-medium text-white/60 mb-2">ライト</div>
                <div className="text-4xl font-bold text-white mb-2">¥150,000<span className="text-lg font-normal text-white/60">/月</span></div>
                <p className="text-sm text-white/50 mb-6">小規模企業・初期導入向け</p>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    月3件まで採用可能
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    投稿数無制限
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    契約期間中のみ利用権
                  </li>
                </ul>
                <a href="#contact" className="w-full py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all text-center">
                  お問い合わせ
                </a>
              </div>
              {/* スタンダード */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-xs font-medium text-white">
                  おすすめ
                </div>
                <div className="text-sm font-medium text-white/60 mb-2">スタンダード</div>
                <div className="text-4xl font-bold text-white mb-2">¥300,000<span className="text-lg font-normal text-white/60">/月</span></div>
                <p className="text-sm text-white/50 mb-6">成長企業・定期UGC向け</p>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    月10件まで採用可能
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    投稿数無制限
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    採用後1年間利用権
                  </li>
                </ul>
                <a href="#contact" className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all text-center">
                  お問い合わせ
                </a>
              </div>
              {/* プロ */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                <div className="text-sm font-medium text-white/60 mb-2">プロ</div>
                <div className="text-4xl font-bold text-white mb-2">¥500,000<span className="text-lg font-normal text-white/60">/月</span></div>
                <p className="text-sm text-white/50 mb-6">大規模企業・大量UGC向け</p>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    採用数無制限
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    投稿数無制限
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    採用後3年間利用権
                  </li>
                </ul>
                <a href="#contact" className="w-full py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all text-center">
                  お問い合わせ
                </a>
              </div>
            </div>
            <p className="text-center text-sm text-white/50 mt-8">
              ※追加採用は1件50,000円（報酬30,000円込み）
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ステマ規制対応 */}
      <section id="stema" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
              ステマ規制対応
            </h2>
            <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
              2023年10月施行の景品表示法改正に完全対応。
              法的リスクを軽減し、安心してUGCを活用できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">自動チェック機能</h3>
                <p className="text-sm text-white/60">AIによる広告表記の有無を自動チェック。不備がある場合は即座に通知します。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">明確な表記義務</h3>
                <p className="text-sm text-white/60">「PR」「広告」「提供：企業名」など、適切な表記をガイドラインで明確に定めています。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">責任範囲の明確化</h3>
                <p className="text-sm text-white/60">企業・クリエイター・プラットフォームの責任範囲を規約で明確に定めています。</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* クリエイター向けセクション */}
      <section id="creators" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
              クリエイター様向け
            </h2>
            <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
              フォロワー数に関係なく、あなたの実力が評価される。
              公正なUGC制作の場を提供します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">実力主義の評価</h3>
                <p className="text-white/60">フォロワー数や過去の実績は不問。作品のクオリティだけで採用が決まります。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">明確な報酬体系</h3>
                <p className="text-white/60">採用1作品につき30,000円（税込）を保証。採用確定から5営業日以内に振り込まれます。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">ポートフォリオ構築</h3>
                <p className="text-white/60">企業からの採用は実績として積み上がり。未経験からのキャリアスタートをサポートします。</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">公平な参加環境</h3>
                <p className="text-white/60">インフルエンサー中心のマッチングサービスとは異なり、すべてのクリエイターに平等な機会を提供します。</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
      <section id="crowdfunding" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              支援を募集中
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Whiskersを一緒に作り上げてくださる仲間を募集しています。<br />
              クラウドファンディングで目標300万円を目指しています。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">¥30,000</div>
                <div className="text-sm text-white/60">ベータ版先行利用権</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">¥100,000</div>
                <div className="text-sm text-white/60">プラットフォーム内広告枠1ヶ月</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">¥300,000</div>
                <div className="text-sm text-white/60">年間無料 + アンバサダー</div>
              </div>
            </div>
            <a
              href="https://camp-fire.jp/projects/view/XXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
              支援する
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          {/* フッターリンク */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              X
            </a>
            <a href="/docs/terms-of-service.md" className="text-white/60 hover:text-white transition-colors">
              利用規約
            </a>
            <a href="/docs/privacy-policy.md" className="text-white/60 hover:text-white transition-colors">
              プライバシーポリシー
            </a>
            <a href="/docs/business-plan.md" className="text-white/60 hover:text-white transition-colors">
              事業計画書
            </a>
            <a href="/contact" className="text-white/60 hover:text-white transition-colors">
              お問い合わせ
            </a>
          </div>
          {/* コピーライト */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Whiskers</span>
            <span>Designed for creators.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
