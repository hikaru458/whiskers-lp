"use client";

import Link from "next/link";
import { 
  Award, 
  Film, 
  Heart, 
  Users,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";

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

export default function CreatorsPage() {
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
              <Link href="/" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">トップ</Link>
              <Link href="/works" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">ギャラリー</Link>
              <Link href="/creators" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">クリエイター</Link>
              <Link href="/contest" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">コンテスト</Link>
              <Link href="/contact" className="bg-[#ff6b35] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#e55a2b] transition-colors">お問い合わせ</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#4ecdc4]/10 text-[#4ecdc4] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            活躍中クリエイター
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
            Whiskersクリエイター
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            フォロワー数不問。作品の質だけで評価されるUGCコンテストで活躍するクリエイターの皆さんです。
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[#4ecdc4]">6名</div>
              <p className="text-sm text-gray-600">活躍クリエイター</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4ecdc4]">21本</div>
              <p className="text-sm text-gray-600">累計採用作品</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4ecdc4]">162.9k</div>
              <p className="text-sm text-gray-600">総再生回数</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-8 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#ff6b35]" />
            注目クリエイター
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.filter(c => c.featured).map((creator) => (
              <div key={creator.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#4ecdc4]/10 rounded-2xl flex items-center justify-center text-3xl">
                    {creator.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#1a1a2e]">{creator.name}</h3>
                      <Award className="w-4 h-4 text-[#ff6b35]" />
                    </div>
                    <p className="text-sm text-[#4ecdc4]">{creator.role}</p>
                    <p className="text-xs text-gray-400">{creator.joinedDate}〜</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {creator.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.specialty.map((tag) => (
                    <span key={tag} className="bg-[#4ecdc4]/10 text-[#4ecdc4] px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="font-bold text-[#1a1a2e]">{creator.works}</p>
                    <p className="text-xs text-gray-500">採用作品</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[#1a1a2e]">{creator.totalViews}</p>
                    <p className="text-xs text-gray-500">総再生</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Creators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-8 flex items-center gap-2">
            <Film className="w-5 h-5" />
            全クリエイター
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((creator) => (
              <div key={creator.id} className="bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-14 h-14 bg-[#f5f5f5] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {creator.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1a1a2e] truncate">{creator.name}</h3>
                    {creator.featured && <Award className="w-3 h-3 text-[#ff6b35] flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{creator.role}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span>{creator.works}作品</span>
                    <span>{creator.totalViews}再生</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For New Creators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#4ecdc4]/10 to-[#ff6b35]/10 rounded-2xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">
                あなたもクリエイターとして活躍しませんか？
              </h2>
              <p className="text-gray-600">
                フォロワー数は関係ありません。あなたの創造力だけで評価されます。
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-[#4ecdc4]" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-1">1. コンテストを選ぶ</h3>
                <p className="text-sm text-gray-600">興味のある商品のコンテストを見つける</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-[#ff6b35]" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-1">2. 商品を体験</h3>
                <p className="text-sm text-gray-600">無料で商品が届くので実際に使ってみる</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-[#ff6b35]" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-1">3. 作品を投稿</h3>
                <p className="text-sm text-gray-600">動画を制作して投稿、採用で賞金獲得</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contest"
                className="inline-flex items-center gap-2 bg-[#4ecdc4] text-white px-8 py-4 rounded-full font-medium hover:bg-[#3dbdb5] transition-all"
              >
                コンテストに参加する
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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
