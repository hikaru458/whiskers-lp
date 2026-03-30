import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  description: "Whiskersは、企業・クリエイター・可能性をつなげるコンテスト型UGCプラットフォームです。確実に優秀な作品が手に入ります。",
  openGraph: {
    title: "Whiskers - 企業とクリエイターをつなぐ",
    description: "コンテスト型UGCプラットフォーム",
    url: "https://whiskers-lp.vercel.app",
    siteName: "Whiskers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whiskers - 企業とクリエイターをつなぐ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiskers - 企業とクリエイターをつなぐ",
    description: "コンテスト型UGCプラットフォーム",
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
        <FilmGrain />
        {children}
      </body>
    </html>
  );
}
