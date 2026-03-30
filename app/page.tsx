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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          {/* BCP Concept */}
          <div className="mb-6">
            <motion.div 
              className="flex items-center justify-center gap-2 mb-8 text-sm font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#f1f5f9]">Brand</span>
              <motion.span 
                className="text-[#3b82f6] text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              >
                ≡
              </motion.span>
              <span className="text-[#f1f5f9]">Creator</span>
              <motion.span 
                className="text-[#3b82f6] text-lg"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
              >
                ≡
              </motion.span>
              <span className="text-[#f1f5f9]">Potential</span>
            </motion.div>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#f1f5f9] mb-6 leading-tight">
            Whiskers
          </h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl sm:text-2xl bg-gradient-to-r from-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            創造をつなぐ
          </motion.p>
          
          {/* Description */}
          <motion.p 
            className="text-base sm:text-lg text-[#94a3b8] mb-8 max-w-xl mx-auto leading-[1.7] tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {activeTab === "brand" ? (
              <>
                ブランドとクリエイターを「コンテスト形式」でつなぐ
                <span className="hidden sm:inline"> </span>
                UGCプラットフォーム。
                <br className="hidden sm:block" />
                確実に優秀な動画が手に入る。
              </>
            ) : (
              <>
                フォロワー数不問、作品の質だけで勝負できる
                <span className="hidden sm:inline"> </span>
                UGCコンテスト。
                <br className="hidden sm:block" />
                あなたの創造力で賞金を獲得しよう。
              </>
            )}
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <button
              className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-medium transition-all ${
                activeTab === "brand" 
                  ? "bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] hover:shadow-lg hover:shadow-[#ff6b35]/25" 
                  : "bg-gradient-to-r from-[#4ecdc4] to-[#3dbdb5] hover:shadow-lg hover:shadow-[#4ecdc4]/25"
              }`}
            >
              {activeTab === "brand" ? "無料で相談する" : "参加を申し込む"}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </button>
          </motion.div>

          {/* Price */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-8 sm:mt-12 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-[#1e293b] px-4 sm:px-6 py-3 rounded-full"
          >
            {activeTab === "brand" ? (
              <>
                <span className="text-[#94a3b8] text-sm sm:text-base">月額</span>
                <motion.span 
                  className="text-xl sm:text-2xl font-bold text-[#ff6b35]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  ¥99,000
                </motion.span>
                <span className="text-[#94a3b8] text-sm sm:text-base">で確実に作品が手に入る</span>
              </>
            ) : (
              <>
                <span className="text-[#94a3b8] text-sm sm:text-base">勝利賞金</span>
                <motion.span 
                  className="text-xl sm:text-2xl font-bold text-[#4ecdc4]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  ¥30,000
                </motion.span>
                <span className="text-[#94a3b8] text-sm sm:text-base">〜 + 追加報酬も</span>
              </>
            )}
          </motion.div>
        </div>
      </section>

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
