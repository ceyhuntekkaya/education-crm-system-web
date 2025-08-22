"use client";

import React, { useState } from "react";
import { Button, Popover } from "@/components/ui";

const PopoverExamples: React.FC = () => {
  const [controlledPopoverOpen, setControlledPopoverOpen] = useState(false);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Popover Komponenti
      </h2>
      <div className="space-y-6">
        {/* Basic Popovers */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Temel Kullanım
          </h3>
          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={<Button variant="outline">Üstte Popover</Button>}
              content={
                <div className="p-2">
                  <h4 className="font-semibold text-white mb-1">Başlık</h4>
                  <p className="text-sm text-gray-200">
                    Üstte gösterilen popover içeriği
                  </p>
                </div>
              }
              placement="top"
            />

            <Popover
              trigger={<Button variant="outline">Altta Popover</Button>}
              content={
                <div className="p-2">
                  <h4 className="font-semibold text-white mb-1">Başlık</h4>
                  <p className="text-sm text-gray-200">
                    Altta gösterilen popover içeriği
                  </p>
                </div>
              }
              placement="bottom"
            />

            <Popover
              trigger={<Button variant="outline">Solda Popover</Button>}
              content={
                <div className="p-2">
                  <h4 className="font-semibold text-white mb-1">Başlık</h4>
                  <p className="text-sm text-gray-200">
                    Solda gösterilen popover içeriği
                  </p>
                </div>
              }
              placement="left"
            />

            <Popover
              trigger={<Button variant="outline">Sağda Popover</Button>}
              content={
                <div className="p-2">
                  <h4 className="font-semibold text-white mb-1">Başlık</h4>
                  <p className="text-sm text-gray-200">
                    Sağda gösterilen popover içeriği
                  </p>
                </div>
              }
              placement="right"
            />
          </div>
        </div>

        {/* Detailed Popovers */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Detaylı İçerik
          </h3>
          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Bilgi
                </Button>
              }
              content={
                <div className="p-3 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-5 h-5 text-blue-300"
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
                    <h4 className="font-semibold text-white">Bilgi</h4>
                  </div>
                  <p className="text-sm text-gray-200 mb-3">
                    Bu detaylı bir popover örneğidir. Uzun açıklamalar ve ek
                    bilgiler için kullanılabilir.
                  </p>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Daha Fazla
                    </button>
                    <button className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                      Kapat
                    </button>
                  </div>
                </div>
              }
              placement="bottom"
            />

            <Popover
              trigger={
                <Button variant="secondary">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profil
                </Button>
              }
              content={
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-300"
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
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">John Doe</h4>
                      <p className="text-sm text-gray-300">john@example.com</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-600 pt-2">
                    <p className="text-xs text-gray-400">
                      Son giriş: 2 saat önce
                    </p>
                  </div>
                </div>
              }
              placement="bottom"
            />
          </div>
        </div>

        {/* Controlled Popover */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Kontrollü Popover
          </h3>
          <div className="flex gap-4 items-center">
            <Popover
              trigger={<Button variant="outline">Kontrollü Popover</Button>}
              content={
                <div className="p-3">
                  <h4 className="font-semibold text-white mb-2">
                    Kontrollü İçerik
                  </h4>
                  <p className="text-sm text-gray-200 mb-3">
                    Bu popover harici butonlarla kontrol edilebilir.
                  </p>
                  <button
                    onClick={() => setControlledPopoverOpen(false)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Kapat
                  </button>
                </div>
              }
              placement="bottom"
              isOpen={controlledPopoverOpen}
              onOpenChange={setControlledPopoverOpen}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setControlledPopoverOpen(true)}
            >
              Aç
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setControlledPopoverOpen(false)}
            >
              Kapat
            </Button>
          </div>
        </div>

        {/* Position Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Konum Örnekleri
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Popover
              trigger={
                <Button size="sm" variant="outline">
                  Top Start
                </Button>
              }
              content={
                <div className="p-2 text-sm text-gray-200">Top Start</div>
              }
              placement="top-start"
            />
            <Popover
              trigger={
                <Button size="sm" variant="outline">
                  Top End
                </Button>
              }
              content={<div className="p-2 text-sm text-gray-200">Top End</div>}
              placement="top-end"
            />
            <Popover
              trigger={
                <Button size="sm" variant="outline">
                  Bottom Start
                </Button>
              }
              content={
                <div className="p-2 text-sm text-gray-200">Bottom Start</div>
              }
              placement="bottom-start"
            />
            <Popover
              trigger={
                <Button size="sm" variant="outline">
                  Bottom End
                </Button>
              }
              content={
                <div className="p-2 text-sm text-gray-200">Bottom End</div>
              }
              placement="bottom-end"
            />
          </div>
        </div>

        {/* Interactive Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Etkileşimli Örnekler
          </h3>
          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Yardım
                </Button>
              }
              content={
                <div className="p-3 max-w-sm">
                  <h4 className="font-semibold text-white mb-2">
                    Nasıl Kullanılır?
                  </h4>
                  <ol className="text-sm text-gray-200 space-y-1 mb-3">
                    <li>1. Butona tıklayın</li>
                    <li>2. Seçenekleri inceleyin</li>
                    <li>3. İstediğiniz aksiyonu seçin</li>
                  </ol>
                  <button className="w-full px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Anladım
                  </button>
                </div>
              }
              placement="bottom"
            />

            <Popover
              trigger={
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Saat
                </Button>
              }
              content={
                <div className="p-3 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {new Date().toLocaleTimeString("tr-TR")}
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date().toLocaleDateString("tr-TR")}
                  </div>
                </div>
              }
              placement="bottom"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Kullanım:</h3>
        <pre className="text-sm text-gray-700 overflow-x-auto">
          {`import { Popover, Button } from '@/components/ui';

// Basit kullanım
<Popover
  trigger={<Button>Popover</Button>}
  content={<div>Popover içeriği</div>}
  placement="bottom"
/>

// Kontrollü kullanım
const [isOpen, setIsOpen] = useState(false);

<Popover
  trigger={<Button>Kontrollü</Button>}
  content={<div>İçerik</div>}
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  closeOnClickOutside={true}
  closeOnEsc={true}
/>`}
        </pre>
      </div>
    </section>
  );
};

export default PopoverExamples;
