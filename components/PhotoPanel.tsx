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
      {/* PC版: 既存レイアウト（グレーパネル内に写真） */}
      <div className="hidden md:block">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.40) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* 写真 */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl m-4">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="420px"
            />
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
              className="inline-block text-sm text-sky-300 hover:text-sky-200 transition-colors"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
