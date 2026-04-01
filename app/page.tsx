"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import PhotoPanel from "@/components/PhotoPanel";
import Scene from "@/components/Scene";

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

      {/* Heroセクション */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      </section>

      {/* 6セクション - PCでは左右交互 */}
      {SECTIONS.map((section, index) => {
        const isEven = index % 2 === 0;
        const isReversed = !isEven;

        return (
          <section
            key={section.title}
            className="relative z-10 min-h-screen flex items-center py-20 px-6"
          >
            <div
              className="max-w-6xl mx-auto w-full"
            >
              {/* PhotoPanel now handles both photo and text for PC */}
              <PhotoPanel
                imageSrc={section.image}
                title={section.title}
                description={section.description}
                imagePosition={isReversed ? "right" : "left"}
              />
            </div>
          </section>
        );
      })}

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Whiskers</span>
          <span>Designed for creators.</span>
        </div>
      </footer>
    </main>
  );
}
