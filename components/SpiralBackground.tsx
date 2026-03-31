"use client";

export default function SpiralBackground() {
  return (
    <>
      {/* 明るいミストグラデーション（20代女子向け） */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(circle_at_0%_80%,rgba(147,197,253,0.28),transparent_60%),radial-gradient(circle_at_100%_80%,rgba(244,114,182,0.28),transparent_60%)] opacity-100" />

      {/* ノイズ */}
      <div
        className="fixed inset-0 -z-10 mix-blend-soft-light bg-[url('/noise.png')]"
        style={{ opacity: 0.12 }}
      />
    </>
  );
}
