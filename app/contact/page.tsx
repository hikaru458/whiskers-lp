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
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|jp|co\.jp|ne\.jp|or\.jp|go\.jp|ac\.jp|ed\.jp|io|ai|me|info|biz|dev)$/i;
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
    <main className="relative min-h-screen overflow-x-hidden overflow-y-scroll" style={{ background: '#f8f7f4', color: '#3d3d3a' }}>
      {/* Header */}
      <Header variant="light" />

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{ color: '#1a1a18' }}>
            お問い合わせ
          </h1>
          <p className="text-center mb-12" style={{ color: '#8a8880' }}>
            ご質問・ご相談がございましたら、お気軽にお問い合わせください。
          </p>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl text-center" style={{ background: '#fff', border: '1px solid #e8e6e1' }}>
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#1a1a18' }}>送信完了</h2>
              <p className="mb-6" style={{ color: '#8a8880' }}>
                お問い合わせありがとうございます。<br />
                5営業日以内にご返信いたします。
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all"
              >
                新しいお問い合わせ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <div className="rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl" style={{ background: '#fff' }}>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: '#1a1a18' }}>この内容で送信しますか？</h3>
                    <div className="space-y-2 text-sm mb-6" style={{ color: '#8a8880' }}>
                      <p><strong style={{ color: '#3d3d3a' }}>お名前：</strong>{formData.name}</p>
                      <p><strong style={{ color: '#3d3d3a' }}>メール：</strong>{formData.email}</p>
                      <p><strong style={{ color: '#3d3d3a' }}>種別：</strong>{getTypeLabel(formData.type)}</p>
                      <div>
                        <strong style={{ color: '#3d3d3a' }}>内容：</strong>
                        <div className="mt-1 p-3 rounded-lg max-h-64 overflow-y-auto whitespace-pre-wrap break-words" style={{ background: '#f8f7f4', color: '#3d3d3a' }}>
                          {formData.message}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowConfirm(false)}
                        className="flex-1 py-3 rounded-xl transition-all"
                        style={{ border: '1px solid #e8e6e1', color: '#3d3d3a', background: '#fff' }}
                      >
                        キャンセル
                      </button>
                      <button
                        type="button"
                        onClick={confirmSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
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
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#3d3d3a' }}>
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                  className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  style={{ background: '#fff', border: '1px solid #e8e6e1', color: '#3d3d3a' }}
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#3d3d3a' }}>
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                  className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  style={{ background: '#fff', border: '1px solid #e8e6e1', color: '#3d3d3a' }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-2" style={{ color: '#3d3d3a' }}>
                  お問い合わせ種別 <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                  className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none cursor-pointer"
                  style={{ background: '#fff', border: '1px solid #e8e6e1', color: '#3d3d3a' }}
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
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#3d3d3a' }}>
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl transition-all resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  style={{ background: '#fff', border: '1px solid #e8e6e1', color: '#3d3d3a' }}
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

              <p className="text-xs text-center" style={{ color: '#8a8880' }}>
                5営業日以内にご返信いたします。
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
