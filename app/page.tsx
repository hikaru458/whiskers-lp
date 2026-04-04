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
      <section id="hero" className="relative z-10 h-screen flex flex-col items-center pt-24 px-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 mb-4">
          <a
            href="#business"
            className="px-6 py-3 rounded-full text-sm font-medium text-white border border-white/40 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
          >
            企業様向け
          </a>
          <a
            href="#creators"
            className="px-6 py-3 rounded-full text-sm font-medium text-white border border-white/40 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
          >
            クリエイター様向け
          </a>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
          Whiskers
        </h1>
        <p className="text-lg md:text-xl text-white/80 text-center max-w-2xl">
          企業とクリエイターをつなぐ<br />コンテスト型UGCプラットフォーム
        </p>
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

      {/* Crowdfundingセクション */}
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
            <a href="#terms" className="text-white/60 hover:text-white transition-colors">
              利用規約
            </a>
            <a href="#privacy" className="text-white/60 hover:text-white transition-colors">
              プライバシーポリシー
            </a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors">
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
