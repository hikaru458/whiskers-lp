"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Shield } from "lucide-react";

export default function TermsPage() {
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
            <div className="w-12 h-12 bg-[#4ecdc4]/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#4ecdc4]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1a1a2e]">
              利用規約
            </h1>
          </div>
          <p className="text-gray-600">
            Whiskersをご利用いただく際の条件について
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#f5f5f5] rounded-2xl p-8 sm:p-12">
            
            <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
              
              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第1条（適用）</h2>
                <p>
                  本規約は、Whiskers（以下「本サービス」）を提供する運営者（以下「運営」）と、
                  本サービスの利用者（企業様・クリエイター様以下「ユーザー」）との間の
                  一切の関係に適用されるものとします。
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第2条（サービスの内容）</h2>
                <p>本サービスは、企業とクリエイターをつなぐUGCコンテストプラットフォームです。</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>企業様はコンテストを開催し、UGC（動画）を募集できます</li>
                  <li>クリエイター様はコンテストに参加し、作品を投稿できます</li>
                  <li>採用された作品は企業様に所有権が移譲されます</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第3条（コンテストの運営）</h2>
                <p className="font-medium mb-2">【企業様】</p>
                <ul className="list-disc pl-5 mb-3 space-y-1">
                  <li>月額料金を支払うことでコンテストを開催できます</li>
                  <li>賞金・賞品は運営を通じてクリエイター様に支払われます</li>
                  <li>採用作品の所有権は企業様に完全に移譲されます</li>
                  <li>投稿作品を広告・マーケティング目的で利用できます</li>
                </ul>
                <p className="font-medium mb-2">【クリエイター様】</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>コンテストに参加する際、募集要項を確認してください</li>
                  <li>応募作品は自分で作成したオリジナル作品であることを保証します</li>
                  <li>採用された場合、作品の所有権を企業様に譲渡することに同意します</li>
                  <li>賞金には源泉徴収が適用される場合があります</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第4条（禁止事項）</h2>
                <p>ユーザーは、以下の行為を行ってはなりません。</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>他者の著作権・肖像権を侵害する作品の投稿</li>
                  <li>虚偽の情報を提供する行為</li>
                  <li>他のユーザー・運営を誹謗中傷する行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>不正アクセスまたはその試み</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第5条（料金・支払い）</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>企業様の月額料金は¥99,000（税別）です</li>
                  <li>支払いは前払い制です</li>
                  <li>返金は原則として行いません</li>
                  <li>料金は予告なく変更される場合があります</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第6条（免責事項）</h2>
                <p>
                  運営は、以下の事項について一切の責任を負いません。
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>ユーザー間のトラブル・紛争</li>
                  <li>投稿作品の内容の正確性・合法性</li>
                  <li>本サービスの中断・停止による損害</li>
                  <li>不可抗力によるサービス提供の遅延・不能</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第7条（サービスの変更・終了）</h2>
                <p>
                  運営は、ユーザーへの事前通知なく、本サービスの内容を変更し、
                  または提供を終了することができます。
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第8条（規約の変更）</h2>
                <p>
                  運営は、必要と判断した場合、ユーザーへの事前通知なく本規約を変更することができます。
                  変更後の規約は、本サービス上に表示された時点で効力を生じます。
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">第9条（準拠法・管轄）</h2>
                <p>
                  本規約の準拠法は日本法とし、本サービスに関する紛争は、
                  運営所在地の裁判所を専属的合意管轄裁判所とします。
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500">
                  制定日：2024年XX月XX日
                </p>
              </div>

            </div>
          </div>

          {/* Privacy Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/privacy"
              className="inline-flex items-center gap-2 text-[#4ecdc4] hover:underline"
            >
              <Shield className="w-4 h-4" />
              プライバシーポリシーはこちら
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
            <div className="flex flex-col items-center gap-4">
              <BrandLogo />
              <span className="text-sm text-gray-500">© 2024 Whiskers. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
