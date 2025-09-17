"use client";

import React, { useState } from "react";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "./index";
import { Button } from "../button";

/**
 * Modal Kullanım Örnekleri
 * Yeni modal component'inin farklı kullanım şekillerini gösterir
 */
export const ModalExamples: React.FC = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [compoundModalOpen, setCompoundModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const [scrollableModalOpen, setScrollableModalOpen] = useState(false);

  return (
    <div className="p-24">
      <h1 className="h2 mb-24">Modal Component Örnekleri</h1>

      <div className="d-flex gap-16 mb-32">
        <Button onClick={() => setBasicModalOpen(true)}>Temel Modal</Button>
        <Button variant="success" onClick={() => setCompoundModalOpen(true)}>
          Compound Modal
        </Button>
        <Button variant="outline" onClick={() => setLargeModalOpen(true)}>
          Büyük Modal
        </Button>
        <Button variant="outline" onClick={() => setScrollableModalOpen(true)}>
          Scrollable Modal
        </Button>
      </div>

      {/* Temel Modal Kullanımı */}
      <Modal
        isOpen={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        size="md"
        ariaLabel="Temel Modal Örneği"
      >
        <ModalHeader
          title="Temel Modal"
          onClose={() => setBasicModalOpen(false)}
        />
        <ModalBody>
          <p>
            Bu temel bir modal örneğidir. Modal component&apos;i
            AppointmentDetailModal&apos;daki yapıya dayalı olarak
            oluşturulmuştur.
          </p>
          <p>Bu modal:</p>
          <ul>
            <li>ESC tuşu ile kapatılabilir</li>
            <li>Backdrop&apos;a tıklayarak kapatılabilir</li>
            <li>Focus management yapılır</li>
            <li>Body scroll&apos;u engellenir</li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setBasicModalOpen(false)}>
            İptal
          </Button>
          <Button onClick={() => setBasicModalOpen(false)}>Tamam</Button>
        </ModalFooter>
      </Modal>

      {/* Compound Pattern Modal */}
      <Modal
        isOpen={compoundModalOpen}
        onClose={() => setCompoundModalOpen(false)}
        size="lg"
      >
        <Modal.Header
          title="Compound Pattern Modal"
          onClose={() => setCompoundModalOpen(false)}
        />
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <h5>Avantajlar</h5>
              <ul>
                <li>Component composition</li>
                <li>Esnek yapı</li>
                <li>Kolay kullanım</li>
                <li>TypeScript desteği</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Özellikler</h5>
              <ul>
                <li>Portal ile render</li>
                <li>Animasyonlu</li>
                <li>Responsive</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer justify="between">
          <Button variant="outline" onClick={() => setCompoundModalOpen(false)}>
            Kapat
          </Button>
          <div className="d-flex gap-12">
            <Button variant="outline">Geri</Button>
            <Button variant="success">Devam Et</Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Büyük Modal */}
      <Modal
        isOpen={largeModalOpen}
        onClose={() => setLargeModalOpen(false)}
        size="xl"
        scrollable
      >
        <ModalHeader
          title="Büyük Modal Örneği"
          onClose={() => setLargeModalOpen(false)}
        />
        <ModalBody scrollable>
          <div className="bg-neutral-25 p-16 rounded-8 mb-16">
            <h5>İçerik Bölümü 1</h5>
            <p>
              Bu XL boyutunda bir modal örneğidir. Geniş içerikler için
              uygundur.
            </p>
          </div>
          <div className="bg-neutral-25 p-16 rounded-8 mb-16">
            <h5>İçerik Bölümü 2</h5>
            <p>
              Modal boyutu sm, md, lg, xl ve fullscreen olarak ayarlanabilir.
            </p>
          </div>
          <div className="bg-neutral-25 p-16 rounded-8 mb-16">
            <h5>İçerik Bölümü 3</h5>
            <p>
              Scrollable özelliği ile uzun içerikler de rahatlıkla
              görüntülenebilir.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setLargeModalOpen(false)}>Kapat</Button>
        </ModalFooter>
      </Modal>

      {/* Scrollable Modal */}
      <Modal
        isOpen={scrollableModalOpen}
        onClose={() => setScrollableModalOpen(false)}
        size="md"
        scrollable
      >
        <ModalHeader
          title="Scrollable Modal"
          onClose={() => setScrollableModalOpen(false)}
        />
        <ModalBody scrollable>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="bg-neutral-25 p-16 rounded-8 mb-16">
              <h6>İçerik Bloğu {i + 1}</h6>
              <p>
                Bu scrollable modal örneğidir. Uzun içerikler için body kısmında
                scroll özelliği aktifdir. Bu şekilde modal boyutu sabit kalırken
                içerik scroll edilebilir.
              </p>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setScrollableModalOpen(false)}
          >
            Kapat
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExamples;
