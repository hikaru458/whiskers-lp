"use client";

export default function SpiralBackground() {
  return (
    <>
      {/* ダークネイビー上のミスト */}
      <div
        className="
          fixed inset-0 -z-10
          bg-[#050814]
          bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%),
              radial-gradient(circle_at_0%_80%,rgba(56,189,248,0.22),transparent_55%),
              radial-gradient(circle_at_100%_80%,rgba(129,140,248,0.26),transparent_55%)]
        "
      />

      {/* ノイズ（控えめ） */}
      <div
        className="fixed inset-0 -z-10 mix-blend-soft-light bg-[url('/noise.png')]"
        style={{ opacity: 0.14 }}
      />
    </>
  );
}
