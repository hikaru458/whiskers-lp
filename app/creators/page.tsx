"use client";

import Link from "next/link";
import { 
  Award, 
  Film, 
  Heart, 
  Users,
  ArrowRight,
  ArrowLeft,
  Star,
  CheckCircle
} from "lucide-react";
import { CatLogo } from "@/components/CatLogo";

// モッククリエイターデータ
const creators = [
  {
    id: "s-san",
    name: "Sさん",
    role: "動画編集初心者",
    bio: "フォロワー0から始めましたが、作品の質だけで評価してもらえて初めてのコンテストで採用されました。",
    avatar: "🎥",
    works: 3,
    totalViews: "25.5k",
    specialty: ["美容", "スキンケア"],
    featured: true,
    joinedDate: "2024年10月"
  },
  {
    id: "t-san",
    name: "Tさん",
    role: "フィットネスインストラクター",
    bio: "本業の知見を活かした動画制作が得意。プロテイン・健康食品系の案件を中心に活動中。",
    avatar: "💪",
    works: 5,
    totalViews: "42.3k",
    specialty: ["健康食品", "フィットネス"],
    featured: true,
    joinedDate: "2024年9月"
  },
  {
    id: "y-san",
    name: "Yさん",
    role: "敏感肌ケア好き",
    bio: "敏感肌コンプレックスを抱えていましたが、商品と出会って肌が変わった経験を動画に。",
    avatar: "💧",
    works: 2,
    totalViews: "18.9k",
    specialty: ["敏感肌", "スキンケア"],
    featured: false,
    joinedDate: "2024年11月"
  },
  {
    id: "k-san",
    name: "Kさん",
    role: "SNSマーケター",
    bio: "副業として始めました。3ヶ月で5本の動画が採用され、合計15万円の報酬を獲得。",
    avatar: "📱",
    works: 5,
    totalViews: "35.1k",
    specialty: ["ファッション", "ライフスタイル"],
    featured: true,
    joinedDate: "2024年8月"
  },
  {
    id: "m-san",
    name: "Mさん",
    role: "大学生",
    bio: "授業の合間にコンテストに参加。スマホ編集だけで採用されるようになりました。",
    avatar: "🎓",
    works: 2,
    totalViews: "12.4k",
    specialty: ["美容", "食品"],
    featured: false,
    joinedDate: "2024年11月"
  },
  {
    id: "a-san",
    name: "Aさん",
    role: "主婦",
    bio: "育児の合間にできる副業として始めました。家庭用品のレビュー動画が得意です。",
    avatar: "🏠",
    works: 4,
    totalViews: "28.7k",
    specialty: ["日用品", "食品"],
    featured: false,
    joinedDate: "2024年9月"
  }
];

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#ff6b35]/10 to-[#ff6b35]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#4ecdc4]/10 to-[#4ecdc4]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <CatLogo className="w-10 h-10 shadow-lg rounded-xl group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1a1a2e] to-[#4a4a5e] bg-clip-text text-transparent">
                Whiskers
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Top
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/works" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/creators" className="text-sm text-[#ff6b35] font-medium relative group">
                Creators
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff6b35]" />
              </Link>
              <Link href="/contest" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Contest
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-[0.1em]">
            <span className="bg-gradient-to-r from-[#1a1a2e] via-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent">
              Whiskersクリエイター
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            フォロワー数不問。作品の質だけで評価されるUGCコンテストで活躍するクリエイターの皆さんです。
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "6", suffix: "名", label: "" },
              { value: "21", suffix: "本", label: "累計採用作品" },
              { value: "162.9", suffix: "k", label: "総再生回数" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35]/20 to-[#4ecdc4]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#1a1a2e] to-[#4ecdc4] bg-clip-text text-transparent mb-2">
                      {stat.value}{stat.suffix}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-2xl font-bold text-[#1a1a2e] mb-8 flex items-center gap-2 tracking-[0.05em]">
            <Star className="w-6 h-6 text-[#ff6b35]" />
            注目クリエイター
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.filter(c => c.featured).map((creator) => (
              <div key={creator.id} className="group bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
                {/* Decorative gradient on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff6b35]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4ecdc4]/20 to-[#4ecdc4]/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                    {creator.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#1a1a2e] text-lg">{creator.name}</h3>
                      <Award className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <p className="text-sm text-[#4ecdc4] font-medium">{creator.role}</p>
                    <p className="text-xs text-gray-400">{creator.joinedDate}〜</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 relative z-10">
                  {creator.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {creator.specialty.map((tag) => (
                    <span key={tag} className="bg-[#4ecdc4]/10 text-[#4ecdc4] px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                  <div className="text-center">
                    <p className="font-bold text-[#1a1a2e] text-xl">{creator.works}</p>
                    <p className="text-xs text-gray-500">採用作品</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[#1a1a2e] text-xl">{creator.totalViews}</p>
                    <p className="text-xs text-gray-500">総再生</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Creators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-2xl font-bold text-[#1a1a2e] mb-8 flex items-center gap-2 tracking-[0.05em]">
            <Film className="w-6 h-6 text-[#4ecdc4]" />
            全クリエイター
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((creator) => (
              <div key={creator.id} className="group bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {creator.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1a1a2e] truncate">{creator.name}</h3>
                    {creator.featured && <Award className="w-4 h-4 text-[#ff6b35] flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{creator.role}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="font-medium">{creator.works}作品</span>
                    <span>{creator.totalViews}再生</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For New Creators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ecdc4]/5 via-white to-[#ff6b35]/5" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-2 bg-[#4ecdc4]/10 text-[#4ecdc4] rounded-full text-sm font-medium mb-4">
                New Creator
              </span>
              <h2 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4 tracking-[0.05em]">
                あなたもクリエイターとして活躍しませんか？
              </h2>
              <p className="text-gray-600 text-lg">
                フォロワー数は関係ありません。あなたの創造力だけで評価されます。
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#4ecdc4]/20 to-[#4ecdc4]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-7 h-7 text-[#4ecdc4]" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">1. コンテストを選ぶ</h3>
                <p className="text-sm text-gray-600">興味のある商品のコンテストを見つける</p>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#ff6b35]/20 to-[#ff6b35]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-[#ff6b35]" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">2. 商品を体験</h3>
                <p className="text-sm text-gray-600">無料で商品が届くので実際に使ってみる</p>
              </div>
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#ff6b35]/20 to-[#ff6b35]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-[#ff6b35]" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">3. 作品を投稿</h3>
                <p className="text-sm text-gray-600">動画を制作して投稿、採用で賞金獲得</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contest"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4ecdc4] to-[#5dddd5] text-white px-10 py-5 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                コンテストに参加する
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <CatLogo className="w-10 h-10 shadow-lg rounded-xl group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xl font-bold text-[#1a1a2e]">Whiskers</span>
                <span className="text-sm text-gray-500 ml-2">— 創造をつなぐ</span>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <Link href="/terms" className="hover:text-[#ff6b35] transition-colors">利用規約</Link>
              <Link href="/privacy" className="hover:text-[#ff6b35] transition-colors">プライバシーポリシー</Link>
              <span className="hidden sm:inline">|</span>
              <span>© 2024 Whiskers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
