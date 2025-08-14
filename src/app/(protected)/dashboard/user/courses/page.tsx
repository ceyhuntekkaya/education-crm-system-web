import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurslarım - Kullanıcı Paneli",
  description: "Kayıtlı olduğum kurslar ve ilerleme durumu",
};

export default function UserCoursesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Kurslarım</h1>
        <p className="mt-2 text-gray-600">
          Kayıtlı olduğunuz kursları görüntüleyin ve ilerlemenizi takip edin.
        </p>
      </div>

      {/* Kurs Filtreleri */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Tümü
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200">
          Devam Eden
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200">
          Tamamlanan
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200">
          Başlayacak
        </button>
      </div>

      {/* Devam Eden Kurslar */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Devam Eden Kurslar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Devam Ediyor
                </span>
                <span className="text-sm text-gray-500">75% Tamamlandı</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                React.js Temelleri
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Modern web uygulamaları geliştirmek için React.js öğrenin.
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>İlerleme</span>
                  <span>15/20 Ders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Eğitmen: Ahmet Yılmaz</span>
                <span>4.8 ⭐</span>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Kursa Devam Et
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Başlayacak
                </span>
                <span className="text-sm text-gray-500">3 gün kaldı</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Python Programlama
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Sıfırdan Python programlama dili öğrenin.
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>İlerleme</span>
                  <span>0/25 Ders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Eğitmen: Mehmet Kaya</span>
                <span>4.9 ⭐</span>
              </div>

              <button className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition duration-200">
                Başlangıç: 17 Ağustos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tamamlanan Kurslar */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Tamamlanan Kurslar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Tamamlandı
                </span>
                <span className="text-sm text-gray-500">Sertifika Alındı</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                HTML & CSS Temelleri
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Web geliştirme için temel HTML ve CSS bilgisi.
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Tamamlanma</span>
                  <span>18/18 Ders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Tamamlanma: 10.07.2025</span>
                <span>4.7 ⭐</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
                  Sertifikayı İndir
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200">
                  Tekrar İzle
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Tamamlandı
                </span>
                <span className="text-sm text-gray-500">Sertifika Alındı</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                JavaScript Temelleri
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Dinamik web sayfaları için JavaScript programlama.
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Tamamlanma</span>
                  <span>22/22 Ders</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Tamamlanma: 25.06.2025</span>
                <span>4.9 ⭐</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
                  Sertifikayı İndir
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200">
                  Tekrar İzle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kurs İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam Kurs</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tamamlanan</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Devam Eden</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <span className="text-2xl">🏆</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sertifika</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
