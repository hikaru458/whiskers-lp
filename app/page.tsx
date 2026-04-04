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
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-center bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent"
          style={{ 
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.15)) drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
            textShadow: '0 2px 30px rgba(255,255,255,0.1)'
          }}
        >
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
