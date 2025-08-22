"use client";

import React, { useState } from "react";
import { Button, Modal } from "@/components/ui";

const ModalExamples: React.FC = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Modal Komponenti
      </h2>
      <div className="space-y-4">
        {/* Modal Triggers */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Modal Türleri
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setBasicModalOpen(true)}>Basit Modal</Button>
            <Button variant="outline" onClick={() => setFormModalOpen(true)}>
              Form Modal
            </Button>
            <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>
              Onay Modal
            </Button>
            <Button variant="secondary" onClick={() => setLargeModalOpen(true)}>
              Büyük Modal
            </Button>
          </div>
        </div>

        {/* Basic Modal */}
        <Modal
          isOpen={basicModalOpen}
          onClose={() => setBasicModalOpen(false)}
          title="Basit Modal Örneği"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Bu basit bir modal örneğidir. Modal komponentini kullanarak
              kullanıcıya bilgi gösterebilir veya basit etkileşimler
              sunabilirsiniz.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setBasicModalOpen(false)}
              >
                Kapat
              </Button>
            </div>
          </div>
        </Modal>

        {/* Form Modal */}
        <Modal
          isOpen={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          title="Form Modal Örneği"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Adınızı ve soyadınızı girin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E-posta adresinizi girin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mesaj
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mesajınızı yazın..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setFormModalOpen(false)}>
                İptal
              </Button>
              <Button
                onClick={() => {
                  alert("Form gönderildi!");
                  setFormModalOpen(false);
                }}
              >
                Gönder
              </Button>
            </div>
          </div>
        </Modal>

        {/* Confirm Modal */}
        <Modal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          title="İşlemi Onayla"
          size="sm"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600">
                  Bu işlem geri alınamaz. Devam etmek istediğinizden emin
                  misiniz?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setConfirmModalOpen(false)}
              >
                İptal
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  alert("İşlem onaylandı!");
                  setConfirmModalOpen(false);
                }}
              >
                Evet, Devam Et
              </Button>
            </div>
          </div>
        </Modal>

        {/* Large Modal */}
        <Modal
          isOpen={largeModalOpen}
          onClose={() => setLargeModalOpen(false)}
          title="Büyük Modal Örneği"
          size="xl"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Geniş İçerik Alanı
              </h3>
              <p className="text-gray-600 mb-4">
                Bu büyük modal örneği, daha fazla içerik göstermek için
                kullanılabilir. Tablolar, uzun formlar veya detaylı bilgiler
                için idealdir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Özellik 1
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Bu alanda özellik açıklaması bulunur.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Özellik 2
                  </h4>
                  <p className="text-green-700 text-sm">
                    Bu alanda başka bir özellik açıklaması bulunur.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Özellik 3
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    Üçüncü özelliğin açıklaması burada yer alır.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    Özellik 4
                  </h4>
                  <p className="text-purple-700 text-sm">
                    Dördüncü özelliğin detayları bu bölümde.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setLargeModalOpen(false)}
              >
                Kapat
              </Button>
              <Button onClick={() => setLargeModalOpen(false)}>Tamam</Button>
            </div>
          </div>
        </Modal>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Kullanım:</h3>
        <pre className="text-sm text-gray-700 overflow-x-auto">
          {`import { Modal, Button } from '@/components/ui';

            const [isOpen, setIsOpen] = useState(false);

            <Modal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            title="Modal Başlığı"
            size="md" // sm, md, lg, xl
            closeOnOverlayClick={true}
            closeOnEsc={true}
            showCloseButton={true}
            >
            <div>
                Modal içeriği...
                <Button onClick={() => setIsOpen(false)}>
                Kapat
                </Button>
            </div>
            </Modal>`}
        </pre>
      </div>
    </section>
  );
};

export default ModalExamples;
