"use client";

import Link from "next/link";

export default function ExamplesPage() {
  const examples = [
    {
      id: "api-hooks",
      title: "🚀 API Hooks Sistemi",
      description:
        "useGet, usePost, usePut, useDelete hook'ları ile JSONPlaceholder API testleri",
      href: "/examples/api-hooks",
      color: "from-blue-500 to-cyan-500",
      features: [
        "JSONPlaceholder fake API ile gerçek testler",
        "GET, POST, PUT, DELETE işlemleri",
        "Pagination desteği",
        "Form entegrasyonu",
        "Todo yönetimi örneği",
        "Otomatik loading/error handling",
      ],
      status: "✅ Çalışır Durumda",
    },
    {
      id: "forms",
      title: "📝 Gelişmiş Form Sistemi",
      description:
        "Yup validation, custom component'ler ve gerçek zamanlı debug",
      href: "/examples/forms",
      color: "from-green-500 to-emerald-500",
      features: [
        "Yup schema validation",
        "Custom form component'leri",
        "AutoComplete desteği",
        "Gerçek zamanlı error tracking",
        "Form state debug paneli",
        "Klavye navigation",
      ],
      status: "✅ Çalışır Durumda",
    },
    {
      id: "ui-components",
      title: "🎨 UI Komponentleri Sistemi",
      description:
        "Button, Modal, Dropdown, Popover, Toast, Tooltip ve daha fazlası",
      href: "/examples/ui-components",
      color: "from-purple-500 to-pink-500",
      features: [
        "Modern UI komponentleri",
        "Tailwind CSS ile tasarım",
        "TypeScript tip güvenliği",
        "Interaktif örnekler",
        "useToast hook sistemi",
        "Responsive tasarım",
      ],
      status: "✅ Çalışır Durumda",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                EduCRM
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-800">
                🧪 Sistem Örnekleri
              </h1>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white/80 hover:bg-white transition-colors"
            >
              🏠 Ana Sayfa
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            🚀 Sistem Bileşenleri ve Örnekleri
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Projede kullanılan özel hook&apos;lar, form sistemi ve API
            entegrasyonlarının canlı örneklerini test edin ve inceleyin.
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
            <p className="text-gray-700">
              Bu örnekler, sistemin nasıl çalıştığını anlaman ve kendi
              projelerinde nasıl kullanabileceğini öğrenmeni sağlar. Her örnek
              gerçek API&apos;lar ve gerçek kullanım senaryoları ile test
              edilmiştir.
            </p>
          </div>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {examples.map((example) => (
              <div
                key={example.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div
                  className={`bg-gradient-to-r ${example.color} p-6 text-white`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{example.title}</h2>
                    <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                      {example.status}
                    </span>
                  </div>
                  <p className="text-white/90 text-lg">{example.description}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    ✨ Özellikler:
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {example.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={example.href}
                    className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${example.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    🔍 Örneği İncele ve Test Et
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 Dokümantasyon ve Kaynak Kodları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">📖 API Hooks</h3>
              <p className="text-gray-600 text-sm mb-3">
                Detaylı kullanım kılavuzu ve API referansı
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                docs/API_HOOKS.md
              </code>
            </div>
            <div className="bg-white/70 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                🔧 Hook Kodları
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Kaynak kodları ve örnekler
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                src/hooks/api/
              </code>
            </div>
            <div className="bg-white/70 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                📝 Form Sistemi
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Form component&apos;leri ve context
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                src/components/forms/
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            🚀 EduCRM System Examples • Built with Next.js, TypeScript, Tailwind
            CSS
          </p>
          <p className="text-gray-500 text-sm mt-2">
            API örnekleri JSONPlaceholder ile test edilmektedir
          </p>
        </div>
      </footer>
    </div>
  );
}
