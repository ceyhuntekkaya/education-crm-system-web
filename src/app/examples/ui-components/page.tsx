"use client";

import React from "react";
import Link from "next/link";
import {
  ButtonExamples,
  ModalExamples,
  DropdownExamples,
  PopoverExamples,
  ToastExamples,
  TooltipExamples,
  InputExamples,
} from "./_sections";

const UIComponentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/examples"
                className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors"
              >
                🎨 UI Komponentleri
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-800">
                Tasarım Sistemi Örnekleri
              </h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/examples"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white/80 hover:bg-white transition-colors"
              >
                ← Örneklere Dön
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white/80 hover:bg-white transition-colors"
              >
                🏠 Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              UI Komponentleri Kütüphanesi
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern, responsive ve erişilebilir UI komponentleri. TypeScript
              desteği ve Tailwind CSS ile tasarlanmış.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Komponentler
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              <a
                href="#button"
                className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
              >
                <div className="text-2xl mb-1">🔘</div>
                <div className="text-sm font-medium">Button</div>
              </a>
              <a
                href="#input"
                className="p-3 bg-indigo-50 rounded-lg text-center hover:bg-indigo-100 transition-colors"
              >
                <div className="text-2xl mb-1">📝</div>
                <div className="text-sm font-medium">Input</div>
              </a>
              <a
                href="#modal"
                className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors"
              >
                <div className="text-2xl mb-1">🗂️</div>
                <div className="text-sm font-medium">Modal</div>
              </a>
              <a
                href="#dropdown"
                className="p-3 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors"
              >
                <div className="text-2xl mb-1">📋</div>
                <div className="text-sm font-medium">Dropdown</div>
              </a>
              <a
                href="#popover"
                className="p-3 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors"
              >
                <div className="text-2xl mb-1">💬</div>
                <div className="text-sm font-medium">Popover</div>
              </a>
              <a
                href="#toast"
                className="p-3 bg-red-50 rounded-lg text-center hover:bg-red-100 transition-colors"
              >
                <div className="text-2xl mb-1">📢</div>
                <div className="text-sm font-medium">Toast</div>
              </a>
              <a
                href="#tooltip"
                className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                <div className="text-2xl mb-1">💡</div>
                <div className="text-sm font-medium">Tooltip</div>
              </a>
            </div>
          </div>

          {/* Components */}
          <div id="button">
            <ButtonExamples />
          </div>

          <div id="input">
            <InputExamples />
          </div>

          <div id="modal">
            <ModalExamples />
          </div>

          <div id="dropdown">
            <DropdownExamples />
          </div>

          <div id="popover">
            <PopoverExamples />
          </div>

          <div id="toast">
            <ToastExamples />
          </div>

          <div id="tooltip">
            <TooltipExamples />
          </div>

          {/* General Usage Notes */}
          <section className="mb-12 mt-16 border-t pt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Genel Kullanım Kılavuzu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    📦
                  </div>
                  <h3 className="font-semibold text-blue-800">Import Etme</h3>
                </div>
                <p className="text-blue-700 mb-3">
                  Tüm komponentleri tek seferde import edebilirsiniz:
                </p>
                <pre className="text-sm bg-white p-3 rounded border">
                  {`import { 
                    Button, Input, Modal, Dropdown, 
                    Popover, Toast, Tooltip 
                  } from '@/components/ui';`}
                </pre>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    🎨
                  </div>
                  <h3 className="font-semibold text-green-800">Tailwind CSS</h3>
                </div>
                <p className="text-green-700">
                  Tüm komponentler Tailwind CSS sınıfları kullanır ve tamamen
                  özelleştirilebilir. Kendi className&apos;lerinizi ekleyerek
                  stilleri değiştirebilirsiniz.
                </p>
              </div>

              <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    ⚡
                  </div>
                  <h3 className="font-semibold text-yellow-800">TypeScript</h3>
                </div>
                <p className="text-yellow-700">
                  Tüm komponentler TypeScript ile yazılmış ve tam tip güvenliği
                  sağlar. IDE&apos;nizde otomatik tamamlama ve hata kontrolü
                  desteklenir.
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    📱
                  </div>
                  <h3 className="font-semibold text-purple-800">Responsive</h3>
                </div>
                <p className="text-purple-700">
                  Komponentler responsive tasarıma sahiptir ve tüm cihaz
                  boyutlarında mükemmel çalışır. Mobil-first yaklaşımı
                  benimsenmiştir.
                </p>
              </div>
            </div>
          </section>

          {/* Performance Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Performans İpuçları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  ✅ Yapılması Gerekenler
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Modalları lazy loading ile yükleyin</li>
                  <li>• Toastları merkezi bir state ile yönetin</li>
                  <li>• Dropdownları gerektiğinde açın</li>
                  <li>• Tooltipleri debounce ile kullanın</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  ❌ Yapılmaması Gerekenler
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Çok fazla Modal aynı anda açmayın</li>
                  <li>• Toast spamı yapmayın</li>
                  <li>• Gereksiz Tooltip kullanmayın</li>
                  <li>• Kompleks Popover içerikleri yapmayın</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UIComponentsPage;
