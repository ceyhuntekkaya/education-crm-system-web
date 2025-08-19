"use client";

import React from "react";
import { Button, Tooltip } from "@/components/ui";

const TooltipExamples: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Tooltip Komponenti
      </h2>
      <div className="space-y-6">
        {/* Basic Tooltips */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Temel Kullanım
          </h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Bu bir tooltip'tir" placement="top">
              <Button variant="outline">Üstte Tooltip</Button>
            </Tooltip>

            <Tooltip
              content="Alt tarafta gösterilen tooltip"
              placement="bottom"
            >
              <Button variant="outline">Altta Tooltip</Button>
            </Tooltip>

            <Tooltip content="Sol tarafta gösterilen tooltip" placement="left">
              <Button variant="outline">Solda Tooltip</Button>
            </Tooltip>

            <Tooltip content="Sağ tarafta gösterilen tooltip" placement="right">
              <Button variant="outline">Sağda Tooltip</Button>
            </Tooltip>
          </div>
        </div>

        {/* Tooltip with Different Delays */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Farklı Gecikmeler
          </h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Hemen görünür" delay={0}>
              <Button size="sm" variant="outline">
                Gecikme Yok
              </Button>
            </Tooltip>

            <Tooltip content="Kısa gecikme ile görünür" delay={500}>
              <Button size="sm" variant="outline">
                500ms Gecikme
              </Button>
            </Tooltip>

            <Tooltip content="Uzun gecikme ile görünür" delay={1000}>
              <Button size="sm" variant="outline">
                1s Gecikme
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Tooltips on Different Elements */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Farklı Elementlerde
          </h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-4 items-center">
              <Tooltip content="Bu bir text input alanıdır">
                <input
                  type="text"
                  placeholder="Hover yapın"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Tooltip>

              <Tooltip content="Bu bir checkbox'tır">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Checkbox</span>
                </label>
              </Tooltip>

              <Tooltip content="Dosya seçme alanı">
                <input
                  type="file"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </Tooltip>
            </div>

            <div className="flex gap-4">
              <Tooltip content="Bu bir link'tir">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Hover yapılabilir link
                </a>
              </Tooltip>

              <Tooltip content="Bu bir span elementdir">
                <span className="px-2 py-1 bg-gray-200 rounded cursor-pointer">
                  Span Element
                </span>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Interactive Tooltips */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Etkileşimli Örnekler
          </h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Yardım: Bu buton bir işlem gerçekleştirir">
              <Button variant="primary">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Yardım
              </Button>
            </Tooltip>

            <Tooltip content="Ayarlar: Uygulama ayarlarını değiştirin">
              <Button variant="outline">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Ayarlar
              </Button>
            </Tooltip>

            <Tooltip content="Silme: Bu işlem geri alınamaz!">
              <Button variant="danger">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Sil
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Tooltip with Icons */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            İkonlarla Kullanım
          </h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Beğen">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </Tooltip>

            <Tooltip content="Paylaş">
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            </Tooltip>

            <Tooltip content="Yorum Ekle">
              <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </Tooltip>

            <Tooltip content="Bookmark">
              <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Disabled Elements with Tooltips */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Devre Dışı Elementler
          </h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Bu buton şu anda kullanılamaz">
              <span className="inline-block">
                <Button disabled>Devre Dışı Buton</Button>
              </span>
            </Tooltip>

            <Tooltip content="Forma devam etmek için gerekli alanları doldurun">
              <span className="inline-block">
                <Button disabled variant="primary">
                  Form Gönder
                </Button>
              </span>
            </Tooltip>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Not: Devre dışı elementlerde tooltip göstermek için span ile
            sarmalama gerekir.
          </p>
        </div>

        {/* Real-world Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Gerçek Kullanım Örnekleri
          </h3>
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="p-4 border border-gray-200 rounded-lg max-w-sm">
              <div className="flex items-center gap-3">
                <Tooltip content="Profil resmi değiştirmek için tıklayın">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                    JD
                  </div>
                </Tooltip>
                <div className="flex-1">
                  <Tooltip content="Kullanıcı adı: john_doe">
                    <h4 className="font-semibold">John Doe</h4>
                  </Tooltip>
                  <Tooltip content="E-posta: john@example.com">
                    <p className="text-sm text-gray-500">Yazılım Geliştirici</p>
                  </Tooltip>
                </div>
                <Tooltip content="Daha fazla seçenek">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Stats Card */}
            <div className="p-4 border border-gray-200 rounded-lg max-w-sm">
              <h4 className="font-semibold mb-3">İstatistikler</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <Tooltip content="Toplam kullanıcı sayısı">
                  <div className="cursor-pointer">
                    <div className="text-2xl font-bold text-blue-600">
                      1,234
                    </div>
                    <div className="text-sm text-gray-500">Kullanıcı</div>
                  </div>
                </Tooltip>
                <Tooltip content="Bu ayki yeni kayıtlar">
                  <div className="cursor-pointer">
                    <div className="text-2xl font-bold text-green-600">+56</div>
                    <div className="text-sm text-gray-500">Yeni</div>
                  </div>
                </Tooltip>
                <Tooltip content="Aktif oturum sayısı">
                  <div className="cursor-pointer">
                    <div className="text-2xl font-bold text-orange-600">89</div>
                    <div className="text-sm text-gray-500">Aktif</div>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Kullanım:</h3>
        <pre className="text-sm text-gray-700 overflow-x-auto">
          {`import { Tooltip, Button } from '@/components/ui';

          // Basit kullanım
          <Tooltip content="Tooltip metni" placement="top">
            <Button>Hover yapın</Button>
          </Tooltip>

          // Gecikme ile
          <Tooltip content="Gecikmeli tooltip" delay={500}>
            <span>Element</span>
          </Tooltip>

          // Devre dışı elementler için
          <Tooltip content="Bu buton kullanılamaz">
            <span className="inline-block">
              <Button disabled>Buton</Button>
            </span>
          </Tooltip>`}
        </pre>
      </div>
    </section>
  );
};

export default TooltipExamples;
