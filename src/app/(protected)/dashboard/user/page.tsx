"use client";

import { useAuth } from "@/contexts/auth-context";

export default function UserPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Kullanıcı Paneli
            </h1>
            <p className="text-gray-600 mt-2">
              Hoş geldiniz, {user?.name} - Kurslarınız ve öğrenim durumunuz
            </p>
          </div>
        </div>

        {/* Basit İçerik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Aktif Kurslarım
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Devam ettiğiniz kurslar
            </p>
            <div className="text-3xl font-bold text-blue-600">3</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tamamlanan Kurslar
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Başarıyla tamamladığınız kurslar
            </p>
            <div className="text-3xl font-bold text-green-600">5</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Toplam İlerleme
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Genel öğrenim ilerlemeniz
            </p>
            <div className="text-3xl font-bold text-purple-600">67%</div>
          </div>
        </div>

        {/* Hızlı İşlemler */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hızlı İşlemler
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Yeni Kursa Katıl
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
              Ödevlerimi Görüntüle
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              Sertifikalarım
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
