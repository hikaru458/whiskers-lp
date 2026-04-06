"use client";

import Image from "next/image";

interface PhotoPanelProps {
  imageSrc: string;
  title: string;
  description: string;
  points?: string[];
  imagePosition?: "left" | "right";
}

export default function PhotoPanel({
  imageSrc,
  title,
  description,
  points = [],
  imagePosition = "left",
}: PhotoPanelProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PC版 - iOSフォルダ風 */}
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-[40px] overflow-hidden shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
        <div className={`relative aspect-[4/5] overflow-hidden ${isImageLeft ? "order-1" : "order-2"}`}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="420px"
          />
        </div>

        <div
          className={`relative flex flex-col justify-center p-8 ${isImageLeft ? "order-2" : "order-1"}`}
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
            <h2 className="text-3xl font-light text-white tracking-wide drop-shadow-lg">{title}</h2>
            <p className="text-base text-white/80 leading-relaxed">{description}</p>
            {points.length > 0 && (
              <ul className="space-y-2 pt-2">
                {points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* スマホ版 - iOSフォルダ風 */}
      <div className="md:hidden rounded-[32px] overflow-hidden shadow-2xl" style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="p-5 relative"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(30px) saturate(150%)',
            WebkitBackdropFilter: 'blur(30px) saturate(150%)',
            borderTop: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <div
            className="absolute top-0 left-4 right-4 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
            }}
          />
          <div className="space-y-2">
            <h3 className="text-lg font-light text-white tracking-wide drop-shadow-md">{title}</h3>
            <p className="text-xs text-white/80 leading-relaxed">{description}</p>
            {points && points.length > 0 && (
              <ul className="space-y-1 pt-1">
                {points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed">
                    <span className="flex-shrink-0 w-1 h-1 rounded-full bg-white/40 mt-1.5" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
