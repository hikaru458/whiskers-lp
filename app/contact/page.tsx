"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

const WhiskersBackground = dynamic(
  () => import("@/components/WhiskersBackground"),
  { ssr: false }
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", type: "general", message: "" });
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Background - Same as LP */}
      <div className="fixed inset-0 z-0">
        <WhiskersBackground />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Whiskers
          </Link>
          <Link 
            href="/" 
            className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            ← トップページに戻る
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            お問い合わせ
          </h1>
          <p className="text-white/60 text-center mb-12">
            ご質問・ご相談がございましたら、お気軽にお問い合わせください。
          </p>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">送信完了</h2>
              <p className="text-white/60 mb-6">
                お問い合わせありがとうございます。<br />
                5営業日以内にご返信いたします。
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"
              >
                新しいお問い合わせ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  お名前 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  メールアドレス <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-white/80 mb-2">
                  お問い合わせ種別 <span className="text-red-400">*</span>
                </label>
                <select
                  id="type"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="general">一般的なお問い合わせ</option>
                  <option value="business">企業様向けお問い合わせ</option>
                  <option value="creator">クリエイター様向けお問い合わせ</option>
                  <option value="support">サポート・トラブル</option>
                  <option value="privacy">プライバシーに関するお問い合わせ</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  お問い合わせ内容 <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                  placeholder="お問い合わせ内容をご記入ください..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </button>

              <p className="text-xs text-white/40 text-center">
                5営業日以内にご返信いたします。
              </p>
            </form>
          )}

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-lg font-semibold mb-4 text-center">その他の連絡先</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-white/60 mb-1">メール</p>
                <p className="text-white/80">contact@whiskers.jp</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <p className="text-sm text-white/60 mb-1">X（Twitter）</p>
                <a href="https://x.com/whiskers_jp" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-orange-400 transition-colors">
                  @whiskers_jp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
