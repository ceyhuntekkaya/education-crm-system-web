"use client";

import React, { useState } from "react";
import { Modal, Button } from "../components/ui";
import { useModal } from "../hooks";

const ModalExamples: React.FC = () => {
  // Hook kullanımı örnekleri
  const basicModal = useModal();
  const confirmModal = useModal();
  const formModal = useModal();

  // State'li örnekler
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState<"sm" | "md" | "lg" | "xl">(
    "md"
  );
  const [currentVariant, setCurrentVariant] = useState<
    "default" | "success" | "warning" | "danger" | "info" | "dark"
  >("default");

  return (
    <div className="container py-60">
      <div className="section-heading text-center mb-60">
        <h2 className="h2 text-heading mb-16">Modal Component Examples</h2>
        <p className="text-lg text-body">
          Tasarım sisteminize uygun modal bileşeni örnekleri
        </p>
      </div>

      <div className="row">
        {/* Basic Modal Examples */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Temel Modal Örnekleri</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Button onClick={basicModal.open}>
              <i className="ph ph-plus me-8"></i>
              Basit Modal
            </Button>

            <Button onClick={confirmModal.open}>
              <i className="ph ph-question me-8"></i>
              Onay Modal&apos;ı
            </Button>

            <Button onClick={formModal.open}>
              <i className="ph ph-pencil me-8"></i>
              Form Modal&apos;ı
            </Button>
          </div>
        </div>

        {/* Modal Sizes */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Farklı Boyutlar</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Button
              size="sm"
              onClick={() => {
                setCurrentSize("sm");
                setIsAdvancedOpen(true);
              }}
            >
              Küçük Modal
            </Button>

            <Button
              onClick={() => {
                setCurrentSize("md");
                setIsAdvancedOpen(true);
              }}
            >
              Orta Modal
            </Button>

            <Button
              onClick={() => {
                setCurrentSize("lg");
                setIsAdvancedOpen(true);
              }}
            >
              Büyük Modal
            </Button>

            <Button
              onClick={() => {
                setCurrentSize("xl");
                setIsAdvancedOpen(true);
              }}
            >
              Ekstra Büyük Modal
            </Button>
          </div>
        </div>

        {/* Modal Variants */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Farklı Varyantlar</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Button
              onClick={() => {
                setCurrentVariant("success");
                setIsAdvancedOpen(true);
              }}
            >
              <i className="ph ph-check me-8"></i>
              Başarılı
            </Button>

            <Button
              onClick={() => {
                setCurrentVariant("warning");
                setIsAdvancedOpen(true);
              }}
            >
              <i className="ph ph-warning me-8"></i>
              Uyarı
            </Button>

            <Button
              variant="error"
              onClick={() => {
                setCurrentVariant("danger");
                setIsAdvancedOpen(true);
              }}
            >
              <i className="ph ph-x-circle me-8"></i>
              Hata
            </Button>

            <Button
              variant="inline"
              onClick={() => {
                setCurrentVariant("info");
                setIsAdvancedOpen(true);
              }}
            >
              <i className="ph ph-info me-8"></i>
              Bilgi
            </Button>

            <Button
              onClick={() => {
                setCurrentVariant("dark");
                setIsAdvancedOpen(true);
              }}
            >
              <i className="ph ph-moon me-8"></i>
              Koyu Tema
            </Button>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Gelişmiş Özellikler</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Button variant="outline" onClick={() => setIsAdvancedOpen(true)}>
              <i className="ph ph-gear me-8"></i>
              Scrollable Modal
            </Button>

            <Button variant="outline" onClick={() => setIsAdvancedOpen(true)}>
              <i className="ph ph-arrows-out me-8"></i>
              Centered Modal
            </Button>
          </div>
        </div>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={basicModal.isOpen}
        onClose={basicModal.close}
        title="Basit Modal"
        size="md"
      >
        <p className="mb-16">
          Bu basit bir modal örneğidir. Modal&apos;lar önemli içerikleri
          vurgulamak ve kullanıcının dikkatini çekmek için kullanılır.
        </p>
        <p className="mb-0">
          ESC tuşu ile kapatabilir veya backdrop&apos;a tıklayabilirsiniz.
        </p>
      </Modal>

      {/* Confirm Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.close}
        title="Eylemi Onayla"
        size="sm"
        variant="warning"
        showFooter
        footer={
          <div className="d-flex gap-12">
            <Button variant="outline" onClick={confirmModal.close}>
              İptal
            </Button>
            <Button variant="error" onClick={confirmModal.close}>
              <i className="ph ph-trash me-8"></i>
              Sil
            </Button>
          </div>
        }
      >
        <p className="mb-16">
          Bu işlem geri alınamaz. Silme işlemini gerçekleştirmek istediğinizden
          emin misiniz?
        </p>
        <div className="bg-warning-25 p-12 rounded-8">
          <small className="text-warning-700">
            <i className="ph ph-warning me-8"></i>
            Bu eylem kalıcıdır ve geri alınamaz.
          </small>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        title="Yeni Kullanıcı Ekle"
        size="lg"
        showFooter
        footer={
          <div className="d-flex gap-12">
            <Button variant="outline" onClick={formModal.close}>
              İptal
            </Button>
            <Button variant="success" onClick={formModal.close}>
              <i className="ph ph-check me-8"></i>
              Kaydet
            </Button>
          </div>
        }
      >
        <form className="row">
          <div className="col-md-6 mb-24">
            <label className="form-label">Ad</label>
            <input
              type="text"
              className="form-control"
              placeholder="Adınızı giriniz"
            />
          </div>
          <div className="col-md-6 mb-24">
            <label className="form-label">Soyad</label>
            <input
              type="text"
              className="form-control"
              placeholder="Soyadınızı giriniz"
            />
          </div>
          <div className="col-12 mb-24">
            <label className="form-label">E-posta</label>
            <input
              type="email"
              className="form-control"
              placeholder="E-posta adresinizi giriniz"
            />
          </div>
          <div className="col-12 mb-24">
            <label className="form-label">Rol</label>
            <select className="form-select">
              <option value="">Rol seçiniz</option>
              <option value="admin">Yönetici</option>
              <option value="editor">Editör</option>
              <option value="user">Kullanıcı</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Açıklama</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Açıklama giriniz..."
            ></textarea>
          </div>
        </form>
      </Modal>

      {/* Advanced Modal */}
      <Modal
        isOpen={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        title={`${
          currentVariant.charAt(0).toUpperCase() + currentVariant.slice(1)
        } Modal (${currentSize.toUpperCase()})`}
        size={currentSize}
        variant={currentVariant}
        scrollable={true}
        centered={true}
        showFooter
        footer={
          <div className="d-flex gap-12">
            <Button onClick={() => setIsAdvancedOpen(false)}>Kapat</Button>
            <Button>Anladım</Button>
          </div>
        }
      >
        <div className="mb-24">
          <h5 className="mb-16">Bu bir {currentVariant} modal&apos;dır</h5>
          <p className="mb-16">
            Modal boyutu: <strong>{currentSize.toUpperCase()}</strong>
          </p>
          <p className="mb-24">
            Bu modal scrollable özelliği ile birlikte gelir ve içerik uzun
            olduğunda scroll bar görünür.
          </p>
        </div>

        <div className="mb-24">
          <h6 className="mb-12">Lorem Ipsum İçerik</h6>
          <p className="mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="mb-16">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="mb-16">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p className="mb-16">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
          <p className="mb-0">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
      </Modal>

      {/* Usage Information */}
      <div className="bg-main-25 p-40 rounded-16 mt-60">
        <h3 className="h4 text-heading mb-24">Kullanım Bilgileri</h3>
        <div className="row">
          <div className="col-lg-6 mb-24 mb-lg-0">
            <h5 className="text-heading mb-16">Temel Props:</h5>
            <ul className="text-body">
              <li>
                <strong>isOpen:</strong> Modal&apos;ın açık/kapalı durumu
                (boolean)
              </li>
              <li>
                <strong>onClose:</strong> Modal kapanma callback fonksiyonu
              </li>
              <li>
                <strong>children:</strong> Modal içeriği (React.ReactNode)
              </li>
              <li>
                <strong>title:</strong> Modal başlığı (opsiyonel)
              </li>
              <li>
                <strong>size:</strong> Boyut (sm, md, lg, xl, fullscreen)
              </li>
              <li>
                <strong>variant:</strong> Tema (default, success, warning,
                danger, info, dark)
              </li>
              <li>
                <strong>position:</strong> Konum (center, top, bottom)
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <h5 className="text-heading mb-16">Özellikler:</h5>
            <ul className="text-body">
              <li>✅ Portal rendering (document.body&apos;ye render)</li>
              <li>✅ Keyboard navigasyonu (ESC tuşu)</li>
              <li>✅ Backdrop click ile kapanma</li>
              <li>✅ Focus trap ve accessibility desteği</li>
              <li>✅ Smooth animasyonlar</li>
              <li>✅ Responsive tasarım</li>
              <li>✅ Custom hook desteği (useModal)</li>
              <li>✅ Body scroll lock</li>
            </ul>
          </div>
        </div>

        <div className="mt-32">
          <h5 className="text-heading mb-16">Kullanım Örneği:</h5>
          <div className="bg-neutral-800 p-20 rounded-8">
            <pre
              className="text-white mb-0"
              style={{ fontSize: "13px", lineHeight: "1.5" }}
            >
              {`import { Modal, useModal } from '@/components/ui';

const MyComponent = () => {
  const modal = useModal();
  
  return (
    <>
      <button onClick={modal.open}>
        Modal Aç
      </button>
      
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Başlık"
        size="md"
        variant="default"
      >
        Modal içeriği burada...
      </Modal>
    </>
  );
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExamples;
