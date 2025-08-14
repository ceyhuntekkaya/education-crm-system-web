"use client";

import { useRouter } from "next/navigation";
import { User } from "@/contexts";
import { ROUTES } from "@/config";

interface UnauthorizedAccessProps {
  user: User | null;
}

export default function UnauthorizedAccess({ user }: UnauthorizedAccessProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Ana Kart */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Bölümü */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-12 text-center">
            <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Erişim Engellendi
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Bu sayfaya erişim yetkiniz bulunmamaktadır. Lütfen uygun
              yetkilendirme için sistem yöneticisi ile iletişime geçin.
            </p>
          </div>

          {/* İçerik Bölümü */}
          <div className="px-8 py-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sol Taraf - Kullanıcı Bilgileri */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Kullanıcı Bilgileriniz
                  </h3>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {user?.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {user?.name || "Bilinmeyen Kullanıcı"}
                      </p>
                      <p className="text-gray-600">
                        {user?.email || "email@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Mevcut Rolünüz:
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {user?.role ? user.role.toUpperCase() : "BİLİNMİYOR"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Yardım Bilgileri */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Yardım ve Destek
                  </h4>
                  <p className="text-blue-800 text-sm mb-3">
                    Bu sayfaya erişim için gereken yetkilere sahip değilsiniz.
                    Aşağıdaki seçenekleri deneyebilirsiniz:
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Farklı bir sayfaya gitmeyi deneyin</li>
                    <li>• Dashboard ana sayfasına dönün</li>
                    <li>• Sistem yöneticisi ile iletişime geçin</li>
                  </ul>
                </div>
              </div>

              {/* Sağ Taraf - Navigasyon Butonları */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Nereye Gitmek İstiyorsunuz?
                </h3>

                <button
                  onClick={() => router.back()}
                  className="w-full group relative bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-gray-700">
                        Geri Dön
                      </h4>
                      <p className="text-sm text-gray-600">
                        Bir önceki sayfaya dön
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => router.push(ROUTES.DASHBOARD.HOME)}
                  className="w-full group relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left text-white"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5v4m8-4v4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Dashboard Ana Sayfa</h4>
                      <p className="text-sm text-blue-100">
                        Ana dashboard&apos;a git
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => router.push(ROUTES.HOME)}
                  className="w-full group relative bg-white border-2 border-green-300 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all duration-200 text-left"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-gray-700">
                        Ana Sayfa
                      </h4>
                      <p className="text-sm text-gray-600">
                        Website ana sayfasına git
                      </p>
                    </div>
                  </div>
                </button>

                {/* İletişim Kartı */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">
                        İletişim
                      </h4>
                      <p className="text-sm text-yellow-700">
                        Yetki sorunu devam ediyorsa sistem yöneticisi ile
                        iletişime geçin:
                        <span className="font-medium"> admin@educrm.com</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 EduCRM - Eğitim Yönetim Sistemi
          </p>
        </div>
      </div>
    </div>
  );
}
