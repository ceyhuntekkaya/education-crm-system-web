import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistem Ayarları - Admin Paneli",
  description: "Sistem geneli ayarlar ve konfigürasyonlar",
};

export default function AdminSettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sistem Ayarları</h1>
        <p className="mt-2 text-gray-600">
          Sistem geneli ayarlarını ve konfigürasyonları yönetin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genel Ayarlar */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Genel Ayarlar
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Adı
                </label>
                <input
                  type="text"
                  defaultValue="Education CRM System"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Açıklaması
                </label>
                <textarea
                  rows={3}
                  defaultValue="Eğitim kurumları için kapsamlı CRM sistemi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Varsayılan Dil
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* E-posta Ayarları */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              E-posta Ayarları
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Sunucu
                </label>
                <input
                  type="text"
                  placeholder="smtp.gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Port
                </label>
                <input
                  type="number"
                  defaultValue="587"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gönderen E-posta
                </label>
                <input
                  type="email"
                  placeholder="noreply@yoursite.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Güvenlik Ayarları */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Güvenlik Ayarları
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    İki Faktörlü Kimlik Doğrulama
                  </label>
                  <p className="text-sm text-gray-500">
                    Tüm kullanıcılar için zorunlu kıl
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Session Timeout
                  </label>
                  <p className="text-sm text-gray-500">
                    Otomatik çıkış süresi (dakika)
                  </p>
                </div>
                <input
                  type="number"
                  defaultValue="60"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Şifre Karmaşıklığı
                  </label>
                  <p className="text-sm text-gray-500">
                    Güçlü şifre zorunluluğu
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sistem Bilgileri */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sistem Bilgileri
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Sistem Versiyonu:
                </span>
                <span className="text-sm text-gray-900">v2.1.0</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Son Güncelleme:
                </span>
                <span className="text-sm text-gray-900">14.08.2025</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Veritabanı Boyutu:
                </span>
                <span className="text-sm text-gray-900">2.8 GB</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Aktif Kullanıcı:
                </span>
                <span className="text-sm text-gray-900">127</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Sistem Durumu:
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Çevrimiçi
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Sistem Yedeklemesi Oluştur
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="mt-6 flex justify-end">
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200">
          Ayarları Kaydet
        </button>
      </div>
    </div>
  );
}
