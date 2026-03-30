"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle, ArrowRight, Zap, Users, Award, Film, Gift, Star, TrendingUp, Palette } from "lucide-react";
import { CatLogo } from "@/components/CatLogo";
import { SpiralBackground } from "@/components/SpiralBackground";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"brand" | "creator">("brand");

  return (
    <div className="min-h-screen relative">
      <SpiralBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <CatLogo className="w-10 h-10" />
              <span className="text-2xl font-bold text-[#f1f5f9]">Whiskers</span>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab("brand")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "brand"
                    ? "bg-white text-[#ff6b35] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ブランド向け
              </button>
              <button
                onClick={() => setActiveTab("creator")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "creator"
                    ? "bg-white text-[#4ecdc4] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                クリエイター向け
              </button>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/works" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">ギャラリー</Link>
              <Link href="/creators" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">クリエイター</Link>
              <Link href="/contest" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">コンテスト</Link>
              <Link href="/products" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">商品紹介</Link>
              <a href="#faq" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">FAQ</a>
              <Link 
                href="/contact"
                className="bg-[#ff6b35] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#e55a2b] transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Empty for 3D spiral background */}
      <section className="relative min-h-screen" />

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0f172a] border-t border-[#1e293b]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#f1f5f9]">Whiskers</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#64748b]">
              <span>© 2024 Whiskers</span>
              <span className="hidden sm:inline">|</span>
              <span>Brand ≡ Creator ≡ Potential</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
