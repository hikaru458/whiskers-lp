"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import PhotoPanel from "@/components/PhotoPanel";
import Scene from "@/components/Scene";
import FadeInSection from "@/components/FadeInSection";
import WhiskersLogo from "@/components/WhiskersLogo";
import ScrollFog from "@/components/ScrollFog";

// 6セクションのデータ
const SECTIONS = [
  {
    image: "/images/image_fx_0.jpg",
    title: "Gallery",
    description: "クリエイターの作品が集まる場所。あなたの感性に触れる一枚を見つけてください。",
    bgGradient: "from-[#0a0f1f] via-[#0f1528] to-[#1a1f3a]",
  },
  {
    image: "/images/image_fx_1.jpg",
    title: "Creator",
    description: "個性豊かなクリエイターたちが活躍する舞台。新しい才能との出会いが待っています。",
    bgGradient: "from-[#1a0f1f] via-[#251525] to-[#3a1f4a]",
  },
  {
    image: "/images/image_fx_2.jpg",
    title: "Contest",
    description: "コンテストで才能を競い合う。賞金と名誉を手に入れよう。",
    bgGradient: "from-[#0f1f1a] via-[#152520] to-[#1f4a3a]",
  },
  {
    image: "/images/juno_0.png",
    title: "Product",
    description: "クリエイターに寄り添うツールとサービス。創作をもっと自由に。",
    bgGradient: "from-[#1f1a0f] via-[#282015] to-[#4a3a1f]",
  },
  {
    image: "/images/juno_1.png",
    title: "FAQ",
    description: "よくある質問と回答。ご不明点があればお気軽にお問い合わせください。",
    bgGradient: "from-[#1f0f0f] via-[#251515] to-[#4a1f1f]",
  },
  {
    image: "/images/juno_2.png",
    title: "Contact",
    description: "お問い合わせはこちらから。クリエイターとユーザー、双方の声をお待ちしています。",
    bgGradient: "from-[#0f1f2f] via-[#152535] to-[#1f3a4a]",
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
      {/* 背景 */}
      <StarfieldBackground />

      {/* ヘッダー */}
      <Header />

      {/* 3D背景シーン */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
        >
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* スクロール濃度効果 */}
      <ScrollFog />

      {/* 6セクション - PCでは左右交互 */}
      <div className="pc-scroll-container hidden md:block h-screen overflow-y-scroll snap-y snap-mandatory" style={{ scrollBehavior: 'smooth' }}>
        {/* Heroセクション */}
        <section id="hero-pc" className="relative z-10 h-screen flex flex-col items-center justify-center px-6 snap-start bg-gradient-to-b from-[#0a0f1f] via-[#0f1528] to-[#1a1f3a]">
        </section>

        {SECTIONS.map((section, index) => {
          const isEven = index % 2 === 0;
          const isReversed = !isEven;

          return (
            <section
              key={`pc-${section.title}`}
              id={`${section.title.toLowerCase()}-pc`}
              className={`relative z-10 h-screen flex items-center py-20 px-6 snap-start bg-gradient-to-b ${section.bgGradient} transition-colors duration-700`}
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

      {/* スマホ版: 通常スクロール */}
      <div className="md:hidden">
        {/* Heroセクション - 新しいWhiskersLogoを使用 */}
        <section id="hero" className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#0a0f1f] via-[#0f1528] to-[#1a1f3a]">
          <WhiskersLogo size="lg" />
        </section>

        {SECTIONS.map((section, index) => {
          const isEven = index % 2 === 0;
          const isReversed = !isEven;

          return (
            <section
              key={`mobile-${section.title}`}
              id={section.title.toLowerCase()}
              className={`relative z-10 min-h-[100svh] flex items-center py-20 px-6 bg-gradient-to-b ${section.bgGradient} transition-colors duration-700`}
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
