"use client";

import React from "react";
import { Button } from "@/components/ui";

const ButtonExamples: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Button Komponenti
      </h2>
      <div className="space-y-4">
        {/* Variant Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Varyantlar</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
        </div>

        {/* Size Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Boyutlar</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Küçük Button</Button>
            <Button size="md">Orta Button</Button>
            <Button size="lg">Büyük Button</Button>
          </div>
        </div>

        {/* Special States */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Özel Durumlar
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              leftIcon={
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
            >
              Sol İkon
            </Button>
            <Button
              rightIcon={
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              }
            >
              Sağ İkon
            </Button>
            <Button isLoading>Yükleniyor</Button>
            <Button disabled>Devre Dışı</Button>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </div>

        {/* Interactive Examples */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Etkileşimli Örnekler
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => alert("Primary button tıklandı!")}>
              Alert Göster
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log("Console log yazıldı")}
            >
              Console Log
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                confirm("Bu işlemi yapmak istediğinizden emin misiniz?")
              }
            >
              Confirm Dialog
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Kullanım:</h3>
        <pre className="text-sm text-gray-700 overflow-x-auto">
          {`import { Button } from '@/components/ui';

            // Basit kullanım
            <Button variant="primary" size="md" onClick={handleClick}>
            Tıkla
            </Button>

            // İkon ile kullanım
            <Button 
            leftIcon={<IconComponent />}
            variant="outline"
            >
            İkon ile Button
            </Button>

            // Loading durumu
            <Button isLoading>
            Yükleniyor...
            </Button>`}
        </pre>
      </div>
    </section>
  );
};

export default ButtonExamples;
