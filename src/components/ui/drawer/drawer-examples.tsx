"use client";
import { useState } from "react";
import { Drawer } from "./drawer";
import Button from "../button";

/**
 * Drawer Component Kullanım Örnekleri
 *
 * Bu dosya, Drawer component'inin farklı kullanım senaryolarını gösterir.
 */
export default function DrawerExamples() {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [topDrawerOpen, setTopDrawerOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [customDrawerOpen, setCustomDrawerOpen] = useState(false);

  return (
    <div className="container py-80">
      <h1 className="mb-32">Drawer Component Örnekleri</h1>

      {/* Pozisyon Örnekleri */}
      <section className="mb-48">
        <h2 className="mb-24">1. Pozisyon Örnekleri</h2>
        <div className="flex-align gap-12 flex-wrap">
          <Button onClick={() => setLeftDrawerOpen(true)}>
            Soldan Açılan Drawer
          </Button>
          <Button onClick={() => setRightDrawerOpen(true)}>
            Sağdan Açılan Drawer
          </Button>
          <Button onClick={() => setTopDrawerOpen(true)}>
            Üstten Açılan Drawer
          </Button>
          <Button onClick={() => setBottomDrawerOpen(true)}>
            Alttan Açılan Drawer
          </Button>
        </div>

        {/* Soldan Açılan */}
        <Drawer
          isOpen={leftDrawerOpen}
          onClose={() => setLeftDrawerOpen(false)}
          position="left"
          width="320px"
          header={
            <div>
              <h3>Soldan Açılan Drawer</h3>
              <p className="text-sm text-neutral-500 mt-4">Pozisyon: Left</p>
            </div>
          }
          footer={
            <div className="flex-align gap-12">
              <button
                onClick={() => setLeftDrawerOpen(false)}
                className="btn btn-outline-main flex-grow-1"
              >
                İptal
              </button>
              <button
                onClick={() => setLeftDrawerOpen(false)}
                className="btn btn-main flex-grow-1"
              >
                Tamam
              </button>
            </div>
          }
        >
          <p>Bu drawer soldan açılır.</p>
          <p className="mt-12">
            ESC tuşuna basarak veya overlay&apos;e tıklayarak kapatabilirsiniz.
          </p>
          <div className="mt-24 p-16 bg-neutral-50 rounded-8">
            <h4 className="mb-8">Özellikler:</h4>
            <ul className="space-y-4 text-sm">
              <li>• Header ile başlık ve açıklama</li>
              <li>• Footer ile aksiyon butonları</li>
              <li>• 320px genişlik</li>
            </ul>
          </div>
        </Drawer>

        {/* Sağdan Açılan */}
        <Drawer
          isOpen={rightDrawerOpen}
          onClose={() => setRightDrawerOpen(false)}
          position="right"
          width="320px"
          header={
            <div className="flex-align gap-12">
              <i className="ph ph-sidebar-simple text-2xl text-primary-600" />
              <div>
                <h3>Sağdan Açılan Drawer</h3>
                <p className="text-sm text-neutral-500">Pozisyon: Right</p>
              </div>
            </div>
          }
          footer={
            <button
              onClick={() => setRightDrawerOpen(false)}
              className="btn btn-main w-100"
            >
              <i className="ph ph-check me-8" />
              Anladım
            </button>
          }
        >
          <p>Bu drawer sağdan açılır.</p>
          <p className="mt-12">
            Genellikle navigasyon veya filtreler için kullanılır.
          </p>
          <div className="mt-24 p-16 bg-primary-50 rounded-8">
            <h4 className="mb-8 text-primary-700">İpucu:</h4>
            <p className="text-sm text-primary-600">
              Footer her zaman drawer&apos;ın en altında sabit kalır, içerik ne
              kadar az olursa olsun.
            </p>
          </div>
        </Drawer>

        {/* Üstten Açılan */}
        <Drawer
          isOpen={topDrawerOpen}
          onClose={() => setTopDrawerOpen(false)}
          position="top"
          height="300px"
          header={
            <div className="flex-between w-100">
              <h3>Üstten Açılan Drawer</h3>
              <span className="badge badge-warning">Yeni</span>
            </div>
          }
          footer={
            <div className="flex-between">
              <span className="text-sm text-neutral-500">Pozisyon: Top</span>
              <button
                onClick={() => setTopDrawerOpen(false)}
                className="btn btn-sm btn-main"
              >
                Kapat
              </button>
            </div>
          }
        >
          <p>Bu drawer üstten açılır.</p>
          <p className="mt-12">Bildirimler veya mesajlar için kullanışlıdır.</p>
        </Drawer>

        {/* Alttan Açılan */}
        <Drawer
          isOpen={bottomDrawerOpen}
          onClose={() => setBottomDrawerOpen(false)}
          position="bottom"
          height="50vh"
          header={
            <div className="text-center w-100">
              <div className="w-40 h-4 bg-neutral-300 rounded-pill mx-auto mb-12" />
              <h3>Alttan Açılan Drawer (Bottom Sheet)</h3>
              <p className="text-sm text-neutral-500 mt-4">
                Mobil deneyimi için optimize edilmiş
              </p>
            </div>
          }
          footer={
            <div className="flex-align gap-12">
              <button
                onClick={() => setBottomDrawerOpen(false)}
                className="btn btn-outline-neutral flex-grow-1"
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  alert("İşlem tamamlandı!");
                  setBottomDrawerOpen(false);
                }}
                className="btn btn-main flex-grow-1"
              >
                Onayla
              </button>
            </div>
          }
        >
          <p>Bu drawer alttan açılır.</p>
          <p className="mt-12">
            Mobil uygulamalarda sıkça kullanılan &quot;bottom sheet&quot;
            pattern&apos;idir.
          </p>
          <div className="mt-24 space-y-12">
            <div className="p-16 bg-neutral-50 rounded-8 flex-align gap-12">
              <i className="ph ph-device-mobile text-2xl" />
              <span>Mobil cihazlarda kullanışlı</span>
            </div>
            <div className="p-16 bg-neutral-50 rounded-8 flex-align gap-12">
              <i className="ph ph-hand-swipe-up text-2xl" />
              <span>Swipe gesture desteği eklenebilir</span>
            </div>
            <div className="p-16 bg-neutral-50 rounded-8 flex-align gap-12">
              <i className="ph ph-arrows-out-simple text-2xl" />
              <span>Esnek yükseklik ayarı</span>
            </div>
          </div>
        </Drawer>
      </section>

      {/* Gerçek Kullanım Örnekleri */}
      <section className="mb-48">
        <h2 className="mb-24">2. Gerçek Kullanım Senaryoları</h2>
        <div className="flex-align gap-12 flex-wrap">
          <Button onClick={() => setFilterDrawerOpen(true)}>
            Filtre Drawer
          </Button>
          <Button onClick={() => setNotificationDrawerOpen(true)}>
            Bildirim Drawer
          </Button>
          <Button onClick={() => setMenuDrawerOpen(true)}>Menü Drawer</Button>
        </div>

        {/* Filtre Drawer */}
        <Drawer
          isOpen={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          position="right"
          width="400px"
          header={
            <div>
              <h3>Filtreler</h3>
              <p className="text-sm text-neutral-500 mt-4">
                Arama sonuçlarını filtreleyin
              </p>
            </div>
          }
          footer={
            <div className="flex-between gap-12">
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="btn btn-outline-main flex-grow-1"
              >
                Sıfırla
              </button>
              <button
                onClick={() => {
                  alert("Filtreler uygulandı!");
                  setFilterDrawerOpen(false);
                }}
                className="btn btn-main flex-grow-1"
              >
                Uygula
              </button>
            </div>
          }
        >
          <div className="space-y-24">
            {/* Fiyat Aralığı */}
            <div>
              <h4 className="mb-12">Fiyat Aralığı</h4>
              <div className="flex-between gap-12 mb-8">
                <input
                  type="number"
                  placeholder="Min"
                  className="form-control"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="form-control"
                />
              </div>
              <input type="range" className="w-100" />
            </div>

            {/* Kategoriler */}
            <div>
              <h4 className="mb-12">Kategoriler</h4>
              <div className="space-y-8">
                {["İlkokul", "Ortaokul", "Lise", "Üniversite"].map((cat) => (
                  <label key={cat} className="flex-align gap-8">
                    <input type="checkbox" />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dil */}
            <div>
              <h4 className="mb-12">Eğitim Dili</h4>
              <div className="space-y-8">
                {["Türkçe", "İngilizce", "Almanca", "Fransızca"].map((lang) => (
                  <label key={lang} className="flex-align gap-8">
                    <input type="checkbox" />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Drawer>

        {/* Bildirim Drawer */}
        <Drawer
          isOpen={notificationDrawerOpen}
          onClose={() => setNotificationDrawerOpen(false)}
          position="right"
          width="380px"
          header={
            <div className="flex-between">
              <h3>Bildirimler</h3>
              <span className="badge badge-main">5 Yeni</span>
            </div>
          }
          footer={
            <button
              onClick={() => alert("Tümü okundu olarak işaretlendi!")}
              className="btn btn-outline-main w-100"
            >
              Tümünü Okundu İşaretle
            </button>
          }
        >
          <div className="space-y-12">
            {[
              {
                id: 1,
                title: "Yeni Randevu",
                message: "15:00'de randevunuz var",
                time: "2 dakika önce",
                unread: true,
              },
              {
                id: 2,
                title: "Mesaj Aldınız",
                message: "Ayşe Yılmaz size mesaj gönderdi",
                time: "1 saat önce",
                unread: true,
              },
              {
                id: 3,
                title: "Liste Güncellendi",
                message: "Favorilerinize yeni kurum eklendi",
                time: "3 saat önce",
                unread: false,
              },
              {
                id: 4,
                title: "Hatırlatma",
                message: "Yarınki toplantıyı unutmayın",
                time: "5 saat önce",
                unread: false,
              },
              {
                id: 5,
                title: "Sistem Bildirimi",
                message: "Profilinizi güncelleyin",
                time: "1 gün önce",
                unread: false,
              },
            ].map((notif) => (
              <div
                key={notif.id}
                className={`p-16 rounded-8 ${
                  notif.unread ? "bg-primary-50" : "bg-neutral-30"
                }`}
                style={{ cursor: "pointer" }}
              >
                <div className="flex-between mb-4">
                  <h5 className="text-sm">{notif.title}</h5>
                  {notif.unread && (
                    <span className="w-8 h-8 rounded-circle bg-primary-600"></span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 mb-4">{notif.message}</p>
                <span className="text-xs text-neutral-500">{notif.time}</span>
              </div>
            ))}
          </div>
        </Drawer>

        {/* Menü Drawer */}
        <Drawer
          isOpen={menuDrawerOpen}
          onClose={() => setMenuDrawerOpen(false)}
          position="left"
          width="280px"
          header={
            <div className="flex-align gap-12">
              <div className="w-40 h-40 rounded-circle bg-primary-600 text-white flex-center">
                JD
              </div>
              <div>
                <h4>John Doe</h4>
                <p className="text-sm text-neutral-500">john@example.com</p>
              </div>
            </div>
          }
          footer={
            <button
              onClick={() => {
                alert("Çıkış yapılıyor...");
                setMenuDrawerOpen(false);
              }}
              className="btn btn-outline-danger w-100"
            >
              <i className="ph-bold ph-sign-out me-8" />
              Çıkış Yap
            </button>
          }
        >
          <nav className="space-y-8">
            <a
              href="#"
              className="flex-align gap-12 p-12 rounded-8 hover-bg-neutral-30"
            >
              <i className="ph ph-house text-xl" />
              <span>Anasayfa</span>
            </a>
            <a
              href="#"
              className="flex-align gap-12 p-12 rounded-8 hover-bg-neutral-30"
            >
              <i className="ph ph-magnifying-glass text-xl" />
              <span>Arama</span>
            </a>
            <a
              href="#"
              className="flex-align gap-12 p-12 rounded-8 hover-bg-neutral-30"
            >
              <i className="ph ph-calendar text-xl" />
              <span>Randevularım</span>
            </a>
            <a
              href="#"
              className="flex-align gap-12 p-12 rounded-8 hover-bg-neutral-30"
            >
              <i className="ph ph-heart text-xl" />
              <span>Favorilerim</span>
            </a>
            <a
              href="#"
              className="flex-align gap-12 p-12 rounded-8 hover-bg-neutral-30"
            >
              <i className="ph ph-user text-xl" />
              <span>Profilim</span>
            </a>
            <a
              href="#"
              className="flex-align gap-12 p-12 rounded-8 hover-bg-neutral-30"
            >
              <i className="ph ph-gear text-xl" />
              <span>Ayarlar</span>
            </a>
          </nav>
        </Drawer>
      </section>

      {/* Özel Özellikler */}
      <section className="mb-48">
        <h2 className="mb-24">3. Özel Özellikler</h2>
        <div className="flex-align gap-12 flex-wrap">
          <Button onClick={() => setCustomDrawerOpen(true)}>Özel Drawer</Button>
        </div>

        {/* Özel Özelliklere Sahip Drawer */}
        <Drawer
          isOpen={customDrawerOpen}
          onClose={() => setCustomDrawerOpen(false)}
          position="right"
          width="500px"
          showCloseButton={false} // Close butonu gizli
          closeOnOverlayClick={false} // Overlay'e tıklayınca kapanmasın
          className="custom-drawer"
        >
          <div className="p-24">
            <h3 className="mb-16">Özel Özellikler</h3>
            <ul className="space-y-8">
              <li>✅ Header yok (başlık içerikte)</li>
              <li>✅ Close butonu gizli</li>
              <li>✅ Overlay&apos;e tıklayınca kapanmıyor</li>
              <li>✅ Özel sınıf eklendi</li>
            </ul>
            <button
              onClick={() => setCustomDrawerOpen(false)}
              className="btn btn-main w-100 mt-24"
            >
              Kapat
            </button>
          </div>
        </Drawer>
      </section>

      {/* Kod Örnekleri */}
      <section>
        <h2 className="mb-24">4. Kod Örnekleri</h2>
        <div className="bg-neutral-50 p-24 rounded-8">
          <h3 className="mb-16">Basit Kullanım</h3>
          <pre className="bg-neutral-900 text-white p-16 rounded-8 overflow-auto">
            {`<Drawer 
  isOpen={isOpen} 
  onClose={onClose}
  header={<h3>Başlık</h3>}
  footer={<button>Kapat</button>}
>
  <p>İçerik buraya</p>
</Drawer>`}
          </pre>

          <h3 className="mb-16 mt-24">Pozisyon ve Boyut</h3>
          <pre className="bg-neutral-900 text-white p-16 rounded-8 overflow-auto">
            {`<Drawer 
  isOpen={isOpen} 
  onClose={onClose}
  position="right"
  width="400px"
  header={<h3>Filtreler</h3>}
>
  {/* İçerik */}
</Drawer>`}
          </pre>

          <h3 className="mb-16 mt-24">Özel Özellikler</h3>
          <pre className="bg-neutral-900 text-white p-16 rounded-8 overflow-auto">
            {`<Drawer 
  isOpen={isOpen} 
  onClose={onClose}
  showCloseButton={false}
  closeOnOverlayClick={false}
  showOverlay={true}
  zIndex={2000}
>
  {/* İçerik */}
</Drawer>`}
          </pre>
        </div>
      </section>
    </div>
  );
}
