"use client";

import { useState } from "react";
import Header from "@/components/Header";

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

  const [showConfirm, setShowConfirm] = useState(false);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      general: '一般的なお問い合わせ',
      business: '企業様向けお問い合わせ',
      creator: 'クリエイター様向けお問い合わせ',
      media: '取材・メディア関連',
      support: 'サポート・トラブル',
      privacy: 'プライバシーに関するお問い合わせ',
      other: 'その他'
    };
    return labels[type] || type;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|jp|co\.jp|ne\.jp|or\.jp|go\.jp|ac\.jp|ed\.jp|io|ai|co|me|info|biz|dev)$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // メールアドレス検証
    if (!validateEmail(formData.email)) {
      setErrorMessage("有効なメールアドレスを入力してください（例: user@example.com）");
      return;
    }
    
    // 確認ダイアログを表示
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setIsSubmitting(true);
    
    try {
      // APIルート経由で送信（CORS回避）
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
    <main className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden overflow-y-scroll">
      {/* Header */}
      <Header variant="light" />

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            お問い合わせ
          </h1>
          <p className="text-gray-500 text-center mb-12">
            ご質問・ご相談がございましたら、お気軽にお問い合わせください。
          </p>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">送信完了</h2>
              <p className="text-gray-600 mb-6">
                お問い合わせありがとうございます。<br />
                5営業日以内にご返信いたします。
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-gray-900 rounded-full text-white hover:bg-gray-800 transition-all"
              >
                新しいお問い合わせ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">この内容で送信しますか？</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <p><strong>お名前：</strong>{formData.name}</p>
                      <p><strong>メール：</strong>{formData.email}</p>
                      <p><strong>種別：</strong>{getTypeLabel(formData.type)}</p>
                      <div>
                        <strong>内容：</strong>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
                          {formData.message}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowConfirm(false)}
                        className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        キャンセル
                      </button>
                      <button
                        type="button"
                        onClick={confirmSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? "送信中..." : "送信する"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                  {errorMessage}
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  お問い合わせ種別 <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="general">一般的なお問い合わせ</option>
                  <option value="business">企業様向けお問い合わせ</option>
                  <option value="creator">クリエイター様向けお問い合わせ</option>
                  <option value="media">取材・メディア関連</option>
                  <option value="support">サポート・トラブル</option>
                  <option value="privacy">プライバシーに関するお問い合わせ</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
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

              <p className="text-xs text-gray-400 text-center">
                5営業日以内にご返信いたします。
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
