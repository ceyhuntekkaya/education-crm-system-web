export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
            <p className="text-lg text-gray-600">
              Bizimle iletişime geçmek için aşağıdaki bilgileri
              kullanabilirsiniz.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  İletişim Bilgileri
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">📍</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Adres</h3>
                      <p className="text-gray-600">
                        Atatürk Mahallesi, Teknoloji Sokak No: 123
                        <br />
                        34100 Fatih/İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">📞</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Telefon</h3>
                      <p className="text-gray-600">+90 212 123 45 67</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">✉️</div>
                    <div>
                      <h3 className="font-medium text-gray-900">E-posta</h3>
                      <p className="text-gray-600">info@educrm.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-blue-600 text-xl">🕒</div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Çalışma Saatleri
                      </h3>
                      <p className="text-gray-600">
                        Pazartesi - Cuma: 09:00 - 18:00
                        <br />
                        Cumartesi: 09:00 - 15:00
                        <br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Bize Yazın
                </h2>

                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Adınızı ve soyadınızı giriniz"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="E-posta adresinizi giriniz"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mesajınızın konusunu giriniz"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mesaj
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mesajınızı buraya yazınız"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium transition-colors"
                  >
                    Mesaj Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
