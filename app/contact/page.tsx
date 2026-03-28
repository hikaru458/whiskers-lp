"use client";

import Link from "next/link";
import { ArrowLeft, Send, User, Building2, Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

// Google Apps Script URL - デプロイ後に書き換えてください
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"brand" | "creator">("brand");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // フォームデータの状態管理
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    category: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Google Apps Scriptが設定されていない場合はモック送信
      if (!GOOGLE_SCRIPT_URL) {
        console.log("Form data:", {
          type: activeTab,
          ...formData
        });
        // モック送信（2秒待機）
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitted(true);
        return;
      }

      // Google Apps Scriptに送信
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: activeTab,
          ...formData
        })
      });

      const result = await response.json();

      if (result.result === "success") {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || "送信に失敗しました");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            トップに戻る
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-4">
            お問い合わせ
          </h1>
          <p className="text-gray-600">
            Whiskersに関するご質問・ご相談はこちらから。
            個人運営ですが、できる限り迅速にお返事いたします。
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab("brand")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "brand"
                    ? "bg-white text-[#ff6b35] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Building2 className="w-4 h-4 inline mr-2" />
                ブランド様
              </button>
              <button
                onClick={() => setActiveTab("creator")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "creator"
                    ? "bg-white text-[#4ecdc4] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                クリエイター様
              </button>
            </div>
          </div>

          {isSubmitted ? (
            // Success Message
            <div className="bg-[#f5f5f5] rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-[#4ecdc4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#4ecdc4]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">
                送信が完了しました
              </h2>
              <p className="text-gray-600 mb-6">
                お問い合わせありがとうございます。<br />
                通常3営業日以内にご返信いたします。
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all"
              >
                トップに戻る
              </Link>
            </div>
          ) : (
            // Contact Form
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">
                  {activeTab === "brand" ? "ブランド様向けお問い合わせ" : "クリエイター様向けお問い合わせ"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {activeTab === "brand" 
                    ? "コンテスト開催、料金についてのご質問など" 
                    : "参加方法、審査基準についてのご質問など"}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Setup Notice */}
              {!GOOGLE_SCRIPT_URL && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-yellow-700 text-sm">
                    ⚠️ Google Apps Scriptが設定されていません。
                    <br />
                    現在はモック送信モードです。データは保存されません。
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                    お名前 <span className="text-[#ff6b35]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={activeTab === "brand" ? "担当者名" : "お名前"}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Brand/Creator Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                    {activeTab === "brand" ? "会社名・ブランド名" : "SNSアカウント名（任意）"}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={activeTab === "brand" ? "例：株式会社〇〇 / Brand〇〇" : "@instagram_handle"}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                    メールアドレス <span className="text-[#ff6b35]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Select */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                    お問い合わせ種別 <span className="text-[#ff6b35]">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-white"
                  >
                    <option value="">選択してください</option>
                    {activeTab === "brand" ? (
                      <>
                        <option value="コンテスト開催">コンテスト開催について</option>
                        <option value="料金・プラン">料金・プランについて</option>
                        <option value="商品の扱い">商品の扱いについて</option>
                        <option value="その他">その他</option>
                      </>
                    ) : (
                      <>
                        <option value="コンテスト参加">コンテスト参加について</option>
                        <option value="審査基準">審査基準について</option>
                        <option value="報酬・支払い">報酬・支払いについて</option>
                        <option value="その他">その他</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                    お問い合わせ内容 <span className="text-[#ff6b35]">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={activeTab === "brand" 
                        ? "どのような商品でコンテストを開催したいか、ご質問などをご記入ください" 
                        : "参加したいコンテストや、ご質問などをご記入ください"}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2 ${
                    activeTab === "brand"
                      ? "bg-[#ff6b35] hover:bg-[#e55a2b]"
                      : "bg-[#4ecdc4] hover:bg-[#3dbdb5]"
                  } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      送信中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      送信する
                    </>
                  )}
                </button>

                {/* Note */}
                <p className="text-xs text-gray-500 text-center">
                  ※ 個人運営のため、お返事までにお時間をいただく場合がございます。
                  <br />
                  通常3営業日以内にご返信いたします。
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg font-bold text-[#1a1a2e] mb-4">
            その他のお問い合わせ方法
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:hello@whiskers.jp" 
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail className="w-4 h-4 text-[#ff6b35]" />
              hello@whiskers.jp
            </a>
            <span className="text-gray-400">または</span>
            <Link 
              href="https://twitter.com/WhiskersJP"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @WhiskersJP
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
