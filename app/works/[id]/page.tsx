"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Play, 
  Heart, 
  Eye, 
  User,
  Building2,
  Award,
  Share2,
  Download,
  CheckCircle
} from "lucide-react";

// モック作品データ
const worksData: Record<string, {
  id: string;
  title: string;
  brand: string;
  product: string;
  creator: string;
  creatorBio: string;
  category: string;
  views: number;
  likes: number;
  description: string;
  thumbnail: string;
  createdAt: string;
  tags: string[];
}> = {
  "1": {
    id: "1",
    title: "マルチユーススキンケア - 朝のルーティン",
    brand: "BeautyLab",
    product: "All-in-Oneジェル",
    creator: "Sさん",
    creatorBio: "動画編集初心者。フォロワー0から始めて、Whiskersで初めての案件を獲得。",
    category: "美容",
    views: 12500,
    likes: 892,
    description: "忙しい朝でも、これ1本でスキンケア完了！時短で叶ううるおい肌。実際に1ヶ月使用した結果を交えてレビューしています。",
    thumbnail: "🎬",
    createdAt: "2024年11月",
    tags: ["スキンケア", "時短", "朝ルーティン", "美容液"]
  },
  "2": {
    id: "2",
    title: "プロテインドリンク - ワークアウト後の1本",
    brand: "HealthyDrink",
    product: "WHEY PROTEIN",
    creator: "Tさん",
    creatorBio: "フィットネスインストラクター。本業の知見を活かした動画制作が得意。",
    category: "食品",
    views: 8900,
    likes: 654,
    description: "トレーニング後30分以内に摂取するのが鉄則！飲みやすさと栄養バランスが魅力のプロテイン。",
    thumbnail: "🥤",
    createdAt: "2024年11月",
    tags: ["プロテイン", "筋トレ", "リカバリー", "健康"]
  },
  "3": {
    id: "3",
    title: "オーガニック化粧水 - 敏感肌の救世主",
    brand: "NaturalCare",
    product: "敏感肌用化粧水",
    creator: "Yさん",
    creatorBio: "敏感肌コンプレックスを抱えていたが、商品と出会って肌が変わった。",
    category: "美容",
    views: 15200,
    likes: 1023,
    description: "敏感肌でも刺激なく、しっかり潤う。今まで10種類以上試しましたが、これがベスト。",
    thumbnail: "💧",
    createdAt: "2024年10月",
    tags: ["敏感肌", "化粧水", "オーガニック", "スキンケア"]
  },
  "4": {
    id: "4",
    title: "スポーツウェア - ランニングのお供に",
    brand: "ActiveWear",
    product: "速乾Tシャツ",
    creator: "Kさん",
    creatorBio: "SNSマーケター。副業としてUGCクリエイター活動中。",
    category: "ファッション",
    views: 6700,
    likes: 445,
    description: "走っても汗が気にならない！伸縮性も抜群で動きやすい。デザインもおしゃれ。",
    thumbnail: "👕",
    createdAt: "2024年10月",
    tags: ["ランニング", "スポーツウェア", "速乾", "ヨガ"]
  }
};

export default function WorkDetailPage() {
  const params = useParams();
  const workId = params?.id as string;
  const work = worksData[workId];

  if (!work) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">作品が見つかりません</p>
          <Link href="/works" className="text-[#ff6b35] hover:underline mt-4 inline-block">
            ギャラリーへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#1a1a2e]">Whiskers</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/contest" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">
                コンテスト
              </Link>
              <Link href="/works" className="text-sm text-[#ff6b35] font-medium">
                ギャラリー
              </Link>
              <Link href="/creators" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">
                クリエイター
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/works" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            ギャラリーに戻る
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Video Player Placeholder */}
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-[9/16] max-w-sm mx-auto mb-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl">{work.thumbnail}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-[#1a1a2e] ml-1" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Work Info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#ff6b35]/10 text-[#ff6b35] px-3 py-1 rounded-full text-sm">
                {work.category}
              </span>
              {work.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl font-bold text-[#1a1a2e] mb-4">
              {work.title}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {work.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {(work.views / 1000).toFixed(1)}k 視聴
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" fill="currentColor" />
                {work.likes} いいね
              </span>
              <span>{work.createdAt}</span>
            </div>

            {/* Brand Info */}
            <div className="bg-[#f5f5f5] rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#ff6b35]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">ブランド</p>
                  <p className="font-bold text-[#1a1a2e]">{work.brand}</p>
                  <p className="text-sm text-gray-600">{work.product}</p>
                </div>
              </div>
            </div>

            {/* Creator Info */}
            <Link href={`/creators/${work.creator}`}>
              <div className="bg-[#f5f5f5] rounded-xl p-4 hover:bg-gray-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#4ecdc4]/10 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-[#4ecdc4]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">クリエイター</p>
                    <p className="font-bold text-[#1a1a2e]">{work.creator}</p>
                    <p className="text-sm text-gray-600 line-clamp-1">{work.creatorBio}</p>
                  </div>
                  <Award className="w-5 h-5 text-[#ff6b35]" />
                </div>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contest"
              className="flex-1 bg-[#ff6b35] text-white py-4 rounded-xl font-medium text-center hover:bg-[#e55a2b] transition-colors"
            >
              コンテストに参加する
            </Link>
            <button className="flex-1 border-2 border-gray-200 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              シェア
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1a1a2e]">Whiskers</span>
              <span className="text-sm text-gray-500">— 創造をつなぐ</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
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
