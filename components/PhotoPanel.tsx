"use client";

import Image from "next/image";

interface PhotoPanelProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

export default function PhotoPanel({
  imageSrc,
  title,
  description,
  linkText = "→ 詳細",
  linkHref = "#",
}: PhotoPanelProps) {
  return (
    <div className="w-full max-w-md mx-auto md:max-w-none">
      {/* グレーパネル（写真より大きい） */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.40) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* 写真 */}
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-xl m-4">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
      </div>

      {/* テキストエリア */}
      <div className="mt-6 space-y-3 px-2">
        <h3 className="text-xl font-light text-white tracking-wide">{title}</h3>
        <p className="text-sm text-white/70 leading-relaxed">{description}</p>
        <a
          href={linkHref}
          className="inline-block text-sm text-white hover:text-sky-300 transition-colors"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}
