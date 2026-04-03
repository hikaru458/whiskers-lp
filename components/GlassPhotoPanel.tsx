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
      <div className="hidden md:grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
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
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-white tracking-wide">
              {title}
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              {description}
            </p>
            <a
              href={linkHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white bg-white/10 border border-white/20 hover:border-sky-400 hover:bg-white/15 transition-all duration-300 mt-2"
            >
              {linkText}
            </a>
          </div>
        </div>
      </div>

      <div className="md:hidden rounded-2xl overflow-hidden">
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
          className="p-6"
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="space-y-3">
            <h3 className="text-xl font-light text-white tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">{description}</p>
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
