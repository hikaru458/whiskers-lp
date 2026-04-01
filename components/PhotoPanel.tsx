"use client";

import Image from "next/image";

interface PhotoPanelProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  imagePosition?: "left" | "right";
}

export default function PhotoPanel({
  imageSrc,
  title,
  description,
  linkText = "→ 詳細",
  linkHref = "#",
  imagePosition = "left",
}: PhotoPanelProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* PC版: 横並びレイアウト - 写真とグレーパネル（文字入り） */}
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
        {/* 写真側 */}
        <div className={`relative aspect-[4/5] overflow-hidden ${isImageLeft ? "order-1" : "order-2"}`}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="420px"
          />
        </div>

        {/* グレーパネル側（写真の反対側）- 文字を内包 */}
        <div
          className={`relative flex flex-col justify-center p-8 ${isImageLeft ? "order-2" : "order-1"}`}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.30) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-white tracking-wide">{title}</h2>
            <p className="text-base text-white/80 leading-relaxed">{description}</p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-2"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>

      {/* スマホ版: 縦並びでグレーパネルが下に伸びる */}
      <div className="md:hidden rounded-2xl overflow-hidden">
        {/* 写真（上部） */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* グレーパネル（下部に伸ばす） */}
        <div
          className="p-6"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.30) 100%)",
            backdropFilter: "blur(15px)",
          }}
        >
          <div className="space-y-3">
            <h3 className="text-xl font-light text-white tracking-wide">{title}</h3>
            <p className="text-sm text-white leading-relaxed">{description}</p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-1"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
