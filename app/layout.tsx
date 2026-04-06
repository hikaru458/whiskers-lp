import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TargetProvider } from "@/lib/TargetContext";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whiskers-lp.vercel.app"),
  title: "Whiskers - 企業とクリエイターをつなぐコンテスト型UGCプラットフォーム",
  description: "投稿数無制限・完全選考制。採用した作品だけに費用が発生するコンテスト型UGCプラットフォーム。フォロワー数不問で、クリエイターの実力が評価される場所。",
  keywords: ["UGC", "コンテスト", "クリエイター", "企業", "インフルエンサーマーケティング", "ステマ規制"],
  openGraph: {
    title: "Whiskers - 企業とクリエイターをつなぐ",
    description: "投稿数無制限・完全選考制のコンテスト型UGCプラットフォーム",
    url: "https://whiskers-lp.vercel.app",
    siteName: "Whiskers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whiskers OGP",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiskers - 企業とクリエイターをつなぐ",
    description: "投稿数無制限・完全選考制のコンテスト型UGCプラットフォーム",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TargetProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </TargetProvider>
      </body>
    </html>
  );
}
