"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import Header from "@/components/Header";

const WhiskersBackground = dynamic(
  () => import("@/components/WhiskersBackground"),
  { ssr: false }
);

// GAS Web App URL - 環境変数から取得
const GAS_WEBAPP_URL = process.env.NEXT_PUBLIC_GAS_WEBAPP_URL || "";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      if (!GAS_WEBAPP_URL) {
        throw new Error("GAS_WEBAPP_URLが設定されていません。");
      }
      
      // POST bodyで送信（CORS対応）
      const response = await fetch(GAS_WEBAPP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          type: formData.type,
          message: formData.message,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", type: "general", message: "" });
      } else {
        setErrorMessage(data.message || "送信に失敗しました。");
      }
    } catch (error) {
      console.error("送信エラー:", error);
      setErrorMessage(error instanceof Error ? error.message : "送信に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden overflow-y-scroll">
      {/* 3D Background - absolute behind content */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <WhiskersBackground />
        </Canvas>
      </div>

      {/* Header - LP Design */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-16 pb-20 px-6">
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
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200">
                  {errorMessage}
                </div>
              )}
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
                  className="w-full px-4 py-3 rounded-xl bg-white border border-white/30 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
                  className="w-full px-4 py-3 rounded-xl bg-white border border-white/30 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
                  className="w-full px-4 py-3 rounded-xl bg-white border border-white/30 text-black focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none cursor-pointer"
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
                  className="w-full px-4 py-3 rounded-xl bg-white border border-white/30 text-black placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
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
        </div>
      </div>
    </main>
  );
}
