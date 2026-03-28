"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Trophy, 
  Building2,
  ArrowRight,
  CheckCircle,
  FileText,
  Clock,
  Gift
} from "lucide-react";

// モックコンテストデータ
const contestData: Record<string, {
  id: string;
  brand: string;
  product: string;
  category: string;
  prize: string;
  deadline: string;
  participants: number;
  description: string;
  requirements: string[];
  deliverables: string[];
  brandDescription: string;
  image: string;
}> = {
  "1": {
    id: "1",
    brand: "BeautyLab",
    product: "All-in-Oneジェル",
    category: "美容",
    prize: "¥30,000",
    deadline: "2024年12月31日",
    participants: 12,
    description: "朝のスキンケア時間を短縮したい20〜30代女性向け。忙しい朝でも手軽に使えるオールインワンジェルの魅力を伝える動画を募集します。",
    requirements: [
      "実際に商品を使用した動画",
      "縦動画（9:16）推奨",
      "15秒〜60秒程度",
      "顔出し必須"
    ],
    deliverables: [
      "元データ（MP4/MOV）",
      "テロップなし・音楽なしの素材",
      "使用感のビフォーアフター"
    ],
    brandDescription: "ナチュラルスキンケアに特化したD2Cブランド。2022年創業、累計販売本数50万本突破。",
    image: "💄"
  },
  "2": {
    id: "2",
    brand: "HealthyDrink",
    product: "WHEY PROTEIN",
    category: "食品",
    prize: "¥50,000",
    deadline: "2024年12月25日",
    participants: 8,
    description: "ワークアウト後のリカバリーに最適なプロテインドリンク。ジム通いを習慣化している20〜40代向けの動画を募集。",
    requirements: [
      "トレーニング前後のシーン含む",
      "縦動画推奨",
      "30秒〜90秒",
      "実際の使用シーン"
    ],
    deliverables: [
      "元データ",
      "飲用シーンのクローズアップ",
      "商品パッケージのクリアな映像"
    ],
    brandDescription: "スポーツ栄養に特化したブランド。プロアスリート愛用率No.1。",
    image: "🥤"
  },
  "3": {
    id: "3",
    brand: "ActiveWear",
    product: "速乾Tシャツ",
    category: "ファッション",
    prize: "¥25,000",
    deadline: "2025年1月15日",
    participants: 5,
    description: "ランニング・ヨガなど、軽い運動時に着用できる速乾Tシャツ。伸縮性とデザイン性をアピールする動画を募集。",
    requirements: [
      "動いているシーン必須",
      "動画・写真両方可",
      "15秒〜45秒",
      "屋外撮影推奨"
    ],
    deliverables: [
      "元データ",
      "全身ショット",
      "素材感がわかるアップ"
    ],
    brandDescription: "機能性とデザイン性を両立したスポーツウェアブランド。",
    image: "👕"
  }
};

export default function ContestDetailPage() {
  const params = useParams();
  const contestId = params?.id as string;
  const contest = contestData[contestId];

  if (!contest) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">コンテストが見つかりません</p>
          <Link href="/contest" className="text-[#ff6b35] hover:underline mt-4 inline-block">
            コンテスト一覧へ
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
              <Link href="/contest" className="text-sm text-[#ff6b35] font-medium">
                コンテスト
              </Link>
              <Link href="/works" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">
                ギャラリー
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/contest" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            コンテスト一覧に戻る
          </Link>
          
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b35]/20 to-[#4ecdc4]/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
              {contest.image}
            </div>
            <div>
              <span className="inline-block bg-[#ff6b35]/10 text-[#ff6b35] px-3 py-1 rounded-full text-xs font-medium mb-2">
                {contest.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-1">
                {contest.product} - UGCコンテスト
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {contest.brand}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-[#f5f5f5] p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Trophy className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm">賞金</span>
              </div>
              <p className="text-xl font-bold text-[#1a1a2e]">{contest.prize}</p>
            </div>
            <div className="bg-[#f5f5f5] p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4 text-[#4ecdc4]" />
                <span className="text-sm">締切</span>
              </div>
              <p className="text-lg font-bold text-[#1a1a2e]">{contest.deadline}</p>
            </div>
            <div className="bg-[#f5f5f5] p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">参加者</span>
              </div>
              <p className="text-xl font-bold text-[#1a1a2e]">{contest.participants}名</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-4">コンテスト概要</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {contest.description}
            </p>
            
            <div className="bg-[#f5f5f5] p-4 rounded-xl">
              <h3 className="font-medium text-[#1a1a2e] mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#ff6b35]" />
                ブランドについて
              </h3>
              <p className="text-sm text-gray-600">{contest.brandDescription}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Requirements */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ff6b35]" />
                応募要件
              </h3>
              <ul className="space-y-3">
                {contest.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#4ecdc4] flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#4ecdc4]" />
                納品物
              </h3>
              <ul className="space-y-3">
                {contest.deliverables.map((del, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#ff6b35] flex-shrink-0 mt-0.5" />
                    {del}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              スケジュール
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#ff6b35] rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[#1a1a2e]">コンテスト参加申し込み</p>
                  <p className="text-sm text-gray-500">本日中に完了</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[#1a1a2e]">商品発送</p>
                  <p className="text-sm text-gray-500">申し込み後3営業日以内</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[#1a1a2e]">作品制作・応募</p>
                  <p className="text-sm text-gray-500">商品到着後〜{contest.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[#1a1a2e]">審査・結果発表</p>
                  <p className="text-sm text-gray-500">締切後1週間以内</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#4ecdc4]/10 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">
              このコンテストに参加する
            </h2>
            <p className="text-gray-600 mb-6">
              商品をお送りしますので、まずは参加申し込みをしてください
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#ff6b35] text-white px-8 py-4 rounded-full font-medium hover:bg-[#e55a2b] transition-all"
            >
              参加申し込み
              <ArrowRight className="w-4 h-4" />
            </Link>
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
