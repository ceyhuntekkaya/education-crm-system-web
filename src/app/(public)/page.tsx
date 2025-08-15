import Link from "next/link";
import { ROUTES } from "@/config";

export default function PublicHomePage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                EduCRM Sistemine Hoş Geldiniz
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Modern eğitim yönetim sistemi ile öğrenci, eğitmen ve kurumunuz
                için kapsamlı çözümler sunuyoruz.
              </p>
              <div className="space-x-4 space-y-4 md:space-y-0">
                <Link
                  href={ROUTES.AUTH.LOGIN}
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Giriş Yap
                </Link>
                <Link
                  href={ROUTES.AUTH.REGISTER}
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 ml-4"
                >
                  Kayıt Ol
                </Link>
              </div>

              {/* Examples Link */}
              <div className="mt-8">
                <Link
                  href="/examples"
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition duration-300"
                >
                  <span>🧪</span>
                  <span>Sistem Örnekleri ve Testler</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Özelliklerimiz
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Eğitim sürecinizi kolaylaştıracak gelişmiş özellikler
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Kullanıcı Yönetimi
                </h3>
                <p className="text-gray-600">
                  Öğrenci ve eğitmenleri kolayca yönetin, rol bazlı erişim
                  kontrolü sağlayın.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Kurs Yönetimi
                </h3>
                <p className="text-gray-600">
                  Kursları organize edin, ilerlemeleri takip edin ve ödevleri
                  yönetin.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Raporlama
                </h3>
                <p className="text-gray-600">
                  Detaylı raporlarla performansı analiz edin ve veri odaklı
                  kararlar alın.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Accounts Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Demo Hesapları
              </h2>
              <p className="text-xl text-gray-600">
                Sistemimizi test etmek için aşağıdaki demo hesapları
                kullanabilirsiniz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Admin Hesabı */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-2xl">👑</span>
                    <h3 className="text-xl font-semibold text-red-800">
                      Admin Hesabı
                    </h3>
                  </div>
                  <div className="text-sm text-red-700 space-y-1">
                    <div>
                      <strong>E-posta:</strong> admin@example.com
                    </div>
                    <div>
                      <strong>Şifre:</strong> admin123
                    </div>
                  </div>
                  <p className="text-sm text-red-600 mt-3">
                    Tüm sistem yönetimi özelliklerine erişim
                  </p>
                </div>
              </div>

              {/* Kurum Hesabı */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-2xl">🏢</span>
                    <h3 className="text-xl font-semibold text-blue-800">
                      Kurum Hesabı
                    </h3>
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>
                      <strong>E-posta:</strong> institution@example.com
                    </div>
                    <div>
                      <strong>Şifre:</strong> inst123
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mt-3">
                    Kurum yönetimi ve öğrenci işlemleri
                  </p>
                </div>
              </div>

              {/* Kullanıcı Hesabı */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-2xl">👤</span>
                    <h3 className="text-xl font-semibold text-green-800">
                      Kullanıcı Hesabı
                    </h3>
                  </div>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>
                      <strong>E-posta:</strong> user@example.com
                    </div>
                    <div>
                      <strong>Şifre:</strong> user123
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-3">
                    Temel kullanıcı özellikleri ve profil yönetimi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hemen Başlayın
            </h2>
            <p className="text-xl mb-8">
              EduCRM ile eğitim yönetiminizi dijitalleştirin
            </p>
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Giriş Yap
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
