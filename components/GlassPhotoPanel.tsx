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
      {/* PC版 - iOSフォルダ風 */}
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-[40px] overflow-hidden shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
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
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            borderTop: '1px solid rgba(255,255,255,0.3)',
            borderLeft: '1px solid rgba(255,255,255,0.15)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          {/* 上部の光のライン - iOS風 */}
          <div 
            className="absolute top-0 left-4 right-4 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
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

      {/* モバイル版 - iOSフォルダ風 */}
      <div className="md:hidden rounded-[32px] overflow-hidden shadow-2xl" style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
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
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(30px) saturate(150%)',
            WebkitBackdropFilter: 'blur(30px) saturate(150%)',
            borderTop: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          {/* 上部の光のライン - iOS風 */}
          <div 
            className="absolute top-0 left-4 right-4 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
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
