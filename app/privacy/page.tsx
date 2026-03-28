"use client";

import Link from "next/link";
import { ArrowLeft, Shield, FileText } from "lucide-react";

export default function PrivacyPage() {
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
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            トップに戻る
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#ff6b35]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1a1a2e]">
              プライバシーポリシー
            </h1>
          </div>
          <p className="text-gray-600">
            個人情報の取り扱いについて
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#f5f5f5] rounded-2xl p-8 sm:p-12">
            
            <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
              
              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">1. 個人情報の収集について</h2>
                <p>
                  Whiskers（以下「本サービス」）は、以下の個人情報を収集いたします。
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>お名前</li>
                  <li>メールアドレス</li>
                  <li>会社名・ブランド名（ブランド様のみ）</li>
                  <li>SNSアカウント情報（クリエイター様のみ）</li>
                  <li>お問い合わせ内容</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">2. 個人情報の利用目的</h2>
                <p>収集した個人情報は、以下の目的で利用いたします。</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>本サービスの提供・運営</li>
                  <li>コンテストの開催・参加管理</li>
                  <li>お問い合わせへの対応</li>
                  <li>重要なお知らせの送信</li>
                  <li>サービス改善のための分析</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">3. 個人情報の第三者提供</h2>
                <p>
                  法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。
                  ただし、コンテスト運営において、ブランド様とクリエイター様間の連絡が必要な場合、
                  最小限の情報を開示することがあります。
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">4. 個人情報の管理</h2>
                <p>
                  個人情報への不正アクセス、紛失、破壊、改ざん、漏洩を防ぐため、
                  適切なセキュリティ対策を講じます。
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">5. Cookieの使用</h2>
                <p>
                  本サービスでは、利用状況の分析やサービス改善のため、Cookieを使用することがあります。
                  ブラウザの設定でCookieを無効化できますが、一部機能が利用できなくなる場合があります。
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">6. お問い合わせ</h2>
                <p>
                  個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
                </p>
                <p className="mt-2 font-medium">
                  E-mail: hello@whiskers.jp
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">7. 改定</h2>
                <p>
                  本ポリシーの内容は、法令の変更やサービスの変更に応じて、予告なく改定されることがあります。
                  改定後は、本サービス上で告知し、直ちに効力を生じるものとします。
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500">
                  制定日：2024年XX月XX日
                </p>
              </div>

            </div>
          </div>

          {/* Terms Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/terms"
              className="inline-flex items-center gap-2 text-[#ff6b35] hover:underline"
            >
              <FileText className="w-4 h-4" />
              利用規約はこちら
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
