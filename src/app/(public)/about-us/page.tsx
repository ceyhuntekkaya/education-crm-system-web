export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Modern eğitim teknolojileri ile geleceğin eğitim sistemini bugünden inşa ediyoruz
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              EduCRM olarak, eğitim kurumlarının dijital dönüşüm sürecinde yanında olmak ve 
              öğrenci başarısını maksimize edecek teknolojik çözümler sunmak için çalışıyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Kalite</h3>
              <p className="text-gray-600">
                En yüksek kalite standartlarında yazılım çözümleri geliştiriyoruz.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">İnovasyon</h3>
              <p className="text-gray-600">
                Sürekli gelişen teknolojilerle geleceğin eğitim sistemlerini tasarlıyoruz.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">İşbirliği</h3>
              <p className="text-gray-600">
                Eğitim kurumları ile güçlü partnerlikler kurarak değer yaratıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden EduCRM?</h2>
            <p className="text-lg text-gray-600">
              Eğitim kurumlarının ihtiyaçlarına özel olarak tasarlanmış özellikler
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Modern Arayüz</h3>
                    <p className="text-gray-600">Kullanıcı dostu ve responsive tasarım</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Güvenli Yapı</h3>
                    <p className="text-gray-600">Rol bazlı erişim kontrolü ve veri güvenliği</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Ölçeklenebilir</h3>
                    <p className="text-gray-600">Her boyutta eğitim kurumu için uygun</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Analitik</h3>
                    <p className="text-gray-600">Detaylı raporlama ve performans analizi</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Entegrasyon</h3>
                    <p className="text-gray-600">Mevcut sistemlerle kolay entegrasyon</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">7/24 Destek</h3>
                    <p className="text-gray-600">Kesintisiz teknik destek hizmeti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ekibimiz</h2>
            <p className="text-lg text-gray-600">
              Deneyimli ve tutkulu ekibimizle eğitimin geleceğini şekillendiriyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-gray-600">👨‍💼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Ahmet Yılmaz</h3>
              <p className="text-blue-600 font-medium">Kurucu & CEO</p>
              <p className="text-gray-600 mt-2">15+ yıl eğitim teknolojileri deneyimi</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-gray-600">👩‍💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Elif Demir</h3>
              <p className="text-blue-600 font-medium">CTO</p>
              <p className="text-gray-600 mt-2">Yazılım mimarisi ve güvenlik uzmanı</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-gray-600">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Mehmet Şahin</h3>
              <p className="text-blue-600 font-medium">Eğitim Uzmanı</p>
              <p className="text-gray-600 mt-2">Pedagoji ve eğitim teknolojileri danışmanı</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
