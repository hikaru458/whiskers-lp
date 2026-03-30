"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle, ArrowRight, Zap, Users, Award, Film, Gift, Star, TrendingUp, Palette } from "lucide-react";
import { BrandStoryTypewriter } from "@/components/TextAnimations";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"brand" | "creator">("brand");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#1a1a2e]">Whiskers</span>
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
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* BCP Concept */}
          <div className="flex items-center justify-center gap-2 mb-8 text-sm font-medium tracking-wide">
            <span className="text-[#1a1a2e]">Brand</span>
            <span className="text-[#ff6b35] text-lg">≡</span>
            <span className="text-[#1a1a2e]">Creator</span>
            <span className="text-[#ff6b35] text-lg">≡</span>
            <span className="text-[#1a1a2e]">Potential</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a1a2e] mb-6 leading-tight">
            Whiskers
          </h1>
          <p className="text-xl sm:text-2xl text-[#ff6b35] font-medium mb-4">
            創造をつなぐ
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {activeTab === "brand" ? (
              <>
                ブランドとクリエイターを「コンテスト形式」でつなぐUGCプラットフォーム。
                <br className="hidden sm:block" />
                確実に優秀な動画が手に入る。
              </>
            ) : (
              <>
                フォロワー数不問、作品の質だけで勝負できるUGCコンテスト。
                <br className="hidden sm:block" />
                あなたの創造力で賞金を獲得しよう。
              </>
            )}
          </p>
          
          <div className="inline-flex items-center gap-4">
            <Link 
              href="https://docs.google.com/forms/d/e/1FAIpQLSf_sample_form_link"
              className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-medium transition-all ${
                activeTab === "brand" 
                  ? "bg-[#ff6b35] hover:bg-[#e55a2b]" 
                  : "bg-[#4ecdc4] hover:bg-[#3dbdb5]"
              }`}
            >
              {activeTab === "brand" ? "無料で相談する" : "参加を申し込む"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#about" 
              className="inline-flex items-center gap-2 text-[#1a1a2e] px-8 py-4 rounded-full font-medium border-2 border-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-all"
            >
              詳しく見る
            </a>
          </div>

          {/* Price Highlight */}
          <div className="mt-12 inline-flex items-center gap-2 bg-[#f5f5f5] px-6 py-3 rounded-full">
            {activeTab === "brand" ? (
              <>
                <span className="text-gray-600">月額</span>
                <span className="text-2xl font-bold text-[#ff6b35]">¥99,000</span>
                <span className="text-gray-600">で確実に作品が手に入る</span>
              </>
            ) : (
              <>
                <span className="text-gray-600">勝利賞金</span>
                <span className="text-2xl font-bold text-[#4ecdc4]">¥30,000</span>
                <span className="text-gray-600">〜 + 追加報酬も</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
              三つの力で、一つの傑作を
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whiskersは、ブランド・クリエイター・可能性をつなげる
              コンテスト型UGCプラットフォームです。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {activeTab === "brand" ? (
              <>
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center mb-4">
                    <Film className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">確実に作品が手に入る</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    採用制だから、使える作品だけに報酬を支払い。
                    コンテストで複数の案から選べます。
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-[#4ecdc4]/10 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#4ecdc4]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">フォロワー不問</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    0フォロワーでも勝てる。作品の質だけで勝負。
                    幅広いクリエイターが参加できます。
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-[#1a1a2e]/10 rounded-xl flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-[#1a1a2e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">完全所有権</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    採用作品は永続的に使用可能。
                    広告、SNS、ECサイトで自由に活用できます。
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-[#4ecdc4]/10 rounded-xl flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-[#4ecdc4]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">商品を無料で使える</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    ブランドの商品を無料で体験。
                    新商品の先行モニターも可能です。
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">作品だけで勝負</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    フォロワー数は関係なし。
                    あなたの創造力だけで評価されます。
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-[#1a1a2e]/10 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-[#1a1a2e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">ポートフォリオ構築</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    実績がそのままポートフォリオに。
                    ブランドとの継続的な関係も作れます。
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
              なぜ Whiskers を選ぶのか
            </h2>
            <p className="text-gray-600">
              従来のUGCサービスとの違い
            </p>
          </div>

          {/* Simple Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Traditional Agencies */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏢</span>
                <h3 className="font-bold text-gray-700">従来の制作会社</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>1本30万円〜</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>制作期間2週間〜</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>修正回数に制限</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>単発の依頼のみ</span>
                </li>
              </ul>
            </div>

            {/* Influencer Marketing */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📱</span>
                <h3 className="font-bold text-gray-700">インフルエンサー活用</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>フォロワー数で価格変動</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>投稿義務のみ・品質不確定</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>使用権利が不明確</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span>
                  <span>スケジュール調整が困難</span>
                </li>
              </ul>
            </div>

            {/* Whiskers - Highlighted */}
            <div className="bg-[#1a1a2e] p-6 rounded-2xl shadow-lg border-2 border-[#ff6b35] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#ff6b35] text-white text-xs px-3 py-1 rounded-full font-medium">
                  おすすめ
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4 mt-2">
                <span className="text-2xl">🎯</span>
                <h3 className="font-bold text-white">Whiskers</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#4ecdc4] mt-0.5">✓</span>
                  <span className="text-[#ff6b35] font-medium">月額¥99,000でコンテスト開催</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4ecdc4] mt-0.5">✓</span>
                  <span className="text-[#ff6b35] font-medium">1週間で複数作品が集まる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4ecdc4] mt-0.5">✓</span>
                  <span className="text-[#ff6b35] font-medium">完全所有権付きで自由に使用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4ecdc4] mt-0.5">✓</span>
                  <span className="text-[#ff6b35] font-medium">継続的な関係構築が可能</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom message */}
          <p className="text-center text-gray-600 mt-8 text-sm">
            Whiskersは「<span className="text-[#ff6b35] font-medium">作品の質</span>」で選べる、新しいUGCのカタチです
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
              {activeTab === "brand" ? "シンプルな料金体系" : "報酬体系"}
            </h2>
            <p className="text-gray-600">
              {activeTab === "brand" 
                ? "月額定額で、確実に優秀な作品が手に入ります" 
                : "あなたの作品が評価され、公平に報酬が支払われます"}
            </p>
          </div>

          <div className={`rounded-3xl p-8 sm:p-12 text-white ${activeTab === "brand" ? "bg-[#1a1a2e]" : "bg-[#4ecdc4]"}`}>
            <div className="text-center mb-8">
              <span className={activeTab === "brand" ? "text-[#4ecdc4]" : "text-white/80"}>{
                activeTab === "brand" ? "月額プラン" : "グランプリ賞金"
              }</span>
              <div className="mt-4">
                <span className="text-5xl sm:text-6xl font-bold">{
                  activeTab === "brand" ? "¥99,000" : "¥30,000"
                }</span>
                <span className="text-gray-400 ml-2">{
                  activeTab === "brand" ? "/月（税込）" : "/本"
                }</span>
              </div>
            </div>

            {activeTab === "brand" ? (
              <>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4ecdc4] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">コンテスト開催 1件/月</p>
                      <p className="text-sm text-gray-400">基本プラン</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4ecdc4] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">勝利賞金 ¥30,000込み</p>
                      <p className="text-sm text-gray-400">1作品の報酬を含む</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4ecdc4] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">完全所有権付与</p>
                      <p className="text-sm text-gray-400">採用作品は永続使用可能</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4ecdc4] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">幅広い業種対応</p>
                      <p className="text-sm text-gray-400">美容〜ペットまでOK</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-8">
                  <p className="text-center text-gray-400 mb-4">追加オプション</p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span>追加採用（同一コンテスト内）</span>
                      <span className="font-medium">¥20,000/本</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span>追加コンテスト</span>
                      <span className="font-medium">¥50,000/件</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">グランプリ賞金</p>
                      <p className="text-sm text-white/80">1本採用で ¥30,000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">追加採用報酬</p>
                      <p className="text-sm text-white/80">同一コンテストで ¥20,000/本</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">商品無料提供</p>
                      <p className="text-sm text-white/80">サンプル商品を無料で体験</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">フォロワー不問</p>
                      <p className="text-sm text-white/80">作品の質だけで評価</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/30 pt-8">
                  <p className="text-center text-white/80 mb-4">審査基準</p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/30">
                      <span>商品の魅力伝達力</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/30">
                      <span>視聴者共感度</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/30">
                      <span>編集・演出の質</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/30">
                      <span>創造性・独自性</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Campaign Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <span className={`text-white px-3 py-1 rounded-full ${activeTab === "brand" ? "bg-[#ff6b35]" : "bg-[#4ecdc4]"}`}>
              {activeTab === "brand" ? "初回限定" : "参加無料"}
            </span>
            <span className="text-gray-600">
              {activeTab === "brand" 
                ? "初月 50% OFF → ¥49,500" 
                : "コンテストへの応募は完全無料"}
            </span>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section id="flow" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
              コンテストの流れ
            </h2>
            <p className="text-gray-600">
              {activeTab === "brand" 
                ? "ブランドは商品情報と作品の方向性を指定するだけ。あとはWhiskersにお任せ" 
                : "商品を無料で体験して、あなたの作品で賞金を獲得"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === "brand" ? [
              { step: "1", title: "コンテスト開催", desc: "商品サンプルとブリーフを準備", icon: Play },
              { step: "2", title: "クリエイター応募", desc: "作品制作・応募", icon: Users },
              { step: "3", title: "審査・採用", desc: "優秀作品を選択", icon: Award },
              { step: "4", title: "所有権移行", desc: "作品を自由に活用", icon: Film },
            ] : [
              { step: "1", title: "コンテストを選択", desc: "参加したいコンテストを見つける", icon: Play },
              { step: "2", title: "商品を受け取る", desc: "無料で商品サンプルを体験", icon: Gift },
              { step: "3", title: "作品を制作", desc: "あなたの創造力で制作・応募", icon: Palette },
              { step: "4", title: "賞金獲得", desc: "採用されれば報酬GET", icon: Award },
            ]).map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-2xl shadow-sm relative">
                <div className={`absolute -top-3 -left-3 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm ${
                  activeTab === "brand" ? "bg-[#ff6b35]" : "bg-[#4ecdc4]"
                }`}>
                  {item.step}
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 mt-2 ${
                  activeTab === "brand" ? "bg-[#ff6b35]/10" : "bg-[#4ecdc4]/10"
                }`}>
                  <item.icon className={`w-5 h-5 ${activeTab === "brand" ? "text-[#ff6b35]" : "text-[#4ecdc4]"}`} />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
              {activeTab === "brand" ? "導入事例" : "成功事例"}
            </h2>
            <p className="text-gray-600">
              {activeTab === "brand" 
                ? "Whiskersを活用して成果を上げたブランド様" 
                : "Whiskersで活躍中のクリエイター"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {activeTab === "brand" ? (
              <>
                {/* Brand Case 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💄</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a2e]">BeautyLab様</h3>
                      <p className="text-sm text-gray-500">スキンケアブランド</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    「自社でUGC制作に時間を取られていましたが、Whiskersのおかげで工数を大幅削減。
                    採用した動画を広告で使用したところ、CPAが30%改善しました。」
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#ff6b35] font-bold">CPA 30%↓</span>
                    </div>
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#4ecdc4] font-bold">工数大幅削減</span>
                    </div>
                  </div>
                </div>

                {/* Brand Case 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#4ecdc4]/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🥤</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a2e]">HealthyDrink様</h3>
                      <p className="text-sm text-gray-500">健康飲料メーカー</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    "新商品の認知拡大に悩んでいましたが、Whiskersのコンテストで10本のUGCを獲得。
                    その動画をSNSで展開したところ、フォロワーが2倍になりました。"
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#ff6b35] font-bold">UGC 10本獲得</span>
                    </div>
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#4ecdc4] font-bold">フォロワー2倍</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Creator Case 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#4ecdc4]/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎥</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a2e]">Sさん</h3>
                      <p className="text-sm text-gray-500">動画編集初心者</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    「フォロワー0から始めましたが、作品の質だけで評価してもらえて初めてのコンテストで採用されました。
                    賞金30,000円獲得。今では継続的に案件をいただいています。」
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#ff6b35] font-bold">初参加で採用</span>
                    </div>
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#4ecdc4] font-bold">継続的に案件獲得</span>
                    </div>
                  </div>
                </div>

                {/* Creator Case 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a2e]">Kさん</h3>
                      <p className="text-sm text-gray-500">SNSマーケター</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    "副業として始めました。3ヶ月で5本の動画が採用され、合計15万円の報酬。
                    本業のスキルも活かせて、ポートフォリオも充実しました。"
                  </p>
                  <div className="flex gap-4 text-sm">
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#ff6b35] font-bold">3ヶ月で5本採用</span>
                    </div>
                    <div className="bg-[#f5f5f5] px-3 py-1 rounded-full">
                      <span className="text-[#4ecdc4] font-bold">副収入15万円</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="brand-story" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto">
          {/* 1段目 - 導入 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4 block">
              Brand Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
              なぜ Whiskers なのか
            </h2>
          </motion.div>

          {/* 2段目 - プロセス */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 1, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { step: "01", title: "募集", desc: "ブランドが商品と賞金を設定" },
              { step: "02", title: "創作", desc: "クリエイターが動画を制作・応募" },
              { step: "03", title: "採用", desc: "最適な作品を選択・使用権を取得" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <span className="text-5xl font-bold text-white/10 block mb-2">{item.step}</span>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* 3段目 - 物語（全7行タイプライティング） */}
          <motion.div 
            className="text-center pt-12 border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <BrandStoryTypewriter />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
              よくある質問
            </h2>
            <p className="text-gray-600">
              {activeTab === "brand" 
                ? "ブランド様からいただくご質問" 
                : "クリエイターさんからいただくご質問"}
            </p>
          </div>

          <div className="space-y-4">
            {(activeTab === "brand" ? [
              {
                q: "商品が特殊な場合（機材が必要など）はどうなりますか？",
                a: "事前にご相談ください。商品の特性に応じて、撮影方法をご提案することも可能です。特別な機材が必要な場合は、レンタル費用をご相談させていただきます。"
              },
              {
                q: "コンテストで応募が少ない場合はどうなりますか？",
                a: "最低応募数（3件）に満たない場合は、コンテスト期間を延長または再開催とさせていただきます。その場合も月額料金に追加費用は発生しません。"
              },
              {
                q: "採用した動画の使用範囲は？",
                a: "完全所有権をお譲りします。広告（SNS、Web、TV）、ECサイト、パンフレットなど、あらゆる用途で永続的にご使用いただけます。"
              },
              {
                q: "複数の商品を同時に募集できますか？",
                a: "はい、可能です。追加コンテスト（¥50,000/件）で同月に複数開催できます。または、1コンテストで複数商品を扱うこともご相談ください。"
              }
            ] : [
              {
                q: "編集ソフトは何を使えばいいですか？",
                a: "特に指定はありません。CapCut、iMovie、Premiere、Final Cutなど、お持ちのソフトで構いません。スマホ編集でも十分に採用されています。"
              },
              {
                q: "縦動画・横動画、どちらが良いですか？",
                a: "ブランドの要望に応じてください。基本的にTikTok/Instagram向けの縦動画（9:16）が多いですが、YouTube向けの横動画（16:9）も必要とされています。"
              },
              {
                q: "締切に間に合わない場合は？",
                a: "締切は原則厳守です。ただし、特別な事情がある場合は事前にご連絡ください。ブランド様と相談の上、対応可能な場合があります。"
              },
              {
                q: "採用されなかった場合、商品は返却しますか？",
                a: "いいえ、商品はお使いいただいて構いません。体験していただいたという意味で、ノベルティとしてお持ちください。"
              }
            ]).map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-[#1a1a2e] mb-2 flex items-start gap-2">
                  <span className={activeTab === "brand" ? "text-[#ff6b35]" : "text-[#4ecdc4]"}>Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm pl-6">
                  A. {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
            {activeTab === "brand" 
              ? "まずは無料で相談してみませんか？" 
              : "あなたの作品を世界に届けよう"}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {activeTab === "brand" 
              ? "Whiskersは個人運営だからこそ、1件1件に徹底的に向き合います。あなたの商品に最適なUGC戦略を一緒に考えます。" 
              : "フォロワー数は関係ありません。あなたの創造力と作品の質だけで評価されます。今すぐ参加して、あなたの可能性を広げましょう。"}
          </p>
          
          <Link 
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_sample_form_link"
            className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-medium transition-all ${
              activeTab === "brand" 
                ? "bg-[#ff6b35] hover:bg-[#e55a2b]" 
                : "bg-[#4ecdc4] hover:bg-[#3dbdb5]"
            }`}
          >
            {activeTab === "brand" ? "無料で相談する" : "参加を申し込む"}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            {activeTab === "brand" 
              ? "初月50% OFFキャンペーン実施中" 
              : "コンテストへの応募は完全無料"}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1a1a2e]">Whiskers</span>
              <span className="text-sm text-gray-500">— 可能性をつなぐ</span>
              <a 
                href="https://x.com/whiskers_ugc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-3 hover:text-[#ff6b35] transition-colors text-gray-500"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>利用規約</span>
              <span>プライバシーポリシー</span>
              <span className="hidden sm:inline">|</span>
              <span>© 2024 Whiskers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
