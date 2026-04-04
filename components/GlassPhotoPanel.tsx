"use client";

import Image from "next/image";

interface GlassPhotoPanelProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  imagePosition?: "left" | "right";
}

export default function GlassPhotoPanel({
  imageSrc,
  title,
  description,
  linkText = "詳細",
  linkHref = "#",
  imagePosition = "left",
}: GlassPhotoPanelProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PC版 - UPP風ガラスエフェクト */}
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-[40px] overflow-hidden shadow-2xl" style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 10px 20px -5px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)' }}>
        {/* 色収差効果 - 青→赤 */}
        <div className="absolute inset-0 rounded-[40px] pointer-events-none" style={{ boxShadow: 'inset 1px 0 0.5px rgba(0,100,255,0.3), inset -1px 0 0.5px rgba(255,50,50,0.3)' }} />
        <div
          className={`relative aspect-[4/5] bg-black ${
            isImageLeft ? "order-1" : "order-2"
          }`}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div
          className={`relative flex flex-col justify-center p-8 ${
            isImageLeft ? "order-2" : "order-1"
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(45px) saturate(200%)',
            WebkitBackdropFilter: 'blur(45px) saturate(200%)',
            borderTop: '1.5px solid rgba(255,255,255,0.35)',
            borderLeft: '1.5px solid rgba(255,255,255,0.2)',
            borderRight: '1.5px solid rgba(255,255,255,0.1)',
            borderBottom: '1.5px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* 角ハイライト - ソフトブルーム */}
          <div className="absolute top-2 left-2 w-16 h-16 rounded-full blur-[2px] opacity-60" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)' }} />
          <div className="absolute top-2 right-2 w-12 h-12 rounded-full blur-[1.5px] opacity-40" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)' }} />
          {/* 内部反射 */}
          <div className="absolute inset-0 rounded-[40px] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)' }} />
          {/* 上部の光のライン - iOS風 */}
          <div 
            className="absolute top-0 left-4 right-4 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              boxShadow: '0 0 2px rgba(255,255,255,0.4)',
            }}
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-white tracking-wide drop-shadow-lg">
              {title}
            </h2>
            <p className="text-base text-white/90 leading-relaxed">
              {description}
            </p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white bg-white/20 border border-white/30 hover:border-white/50 hover:bg-white/30 transition-all duration-300 mt-2 shadow-lg backdrop-blur-sm"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>

      {/* モバイル版 - UPP風ガラスエフェクト */}
      <div className="md:hidden rounded-[32px] overflow-hidden shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 8px 16px -4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)' }}>
        {/* 色収差効果 - 青→赤 */}
        <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ boxShadow: 'inset 0.5px 0 0.5px rgba(0,100,255,0.25), inset -0.5px 0 0.5px rgba(255,50,50,0.25)' }} />
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="p-6 relative"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(35px) saturate(180%)',
            WebkitBackdropFilter: 'blur(35px) saturate(180%)',
            borderTop: '1.5px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* 角ハイライト - ソフトブルーム */}
          <div className="absolute top-2 left-2 w-12 h-12 rounded-full blur-[1.5px] opacity-50" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)' }} />
          {/* 内部反射 */}
          <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)' }} />
          {/* 上部の光のライン - iOS風 */}
          <div 
            className="absolute top-0 left-4 right-4 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
              boxShadow: '0 0 2px rgba(255,255,255,0.3)',
            }}
          />
          <div className="space-y-3">
            <h3 className="text-xl font-light text-white tracking-wide drop-shadow-md">
              {title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">{description}</p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-white/20 border border-white/30 hover:border-white/50 hover:bg-white/30 transition-all duration-300 mt-1 shadow-lg backdrop-blur-sm"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
