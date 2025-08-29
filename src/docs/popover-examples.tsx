"use client";

import React from "react";
import Popover from "../components/ui/popover";

const PopoverExamples: React.FC = () => {
  return (
    <div className="container py-60">
      <div className="section-heading text-center mb-60">
        <h2 className="h2 text-heading mb-16">Popover Component Examples</h2>
        <p className="text-lg text-body">
          Tasarım sisteminize uygun popover bileşeni örnekleri
        </p>
      </div>

      <div className="row">
        {/* Header Menu Style Popover */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Header Menü Stili</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Popover
              content={
                <div>
                  <a href="#" className="popover-item item-hover activePage">
                    <i className="ph ph-house"></i>
                    Ana Sayfa
                  </a>
                  <a href="#" className="popover-item item-hover">
                    <i className="ph ph-user"></i>
                    Profil
                  </a>
                  <a href="#" className="popover-item item-hover">
                    <i className="ph ph-gear"></i>
                    Ayarlar
                    <span className="badge bg-main-600 text-white">Yeni</span>
                  </a>
                  <a href="#" className="popover-item item-hover">
                    <i className="ph ph-sign-out"></i>
                    Çıkış Yap
                  </a>
                </div>
              }
              placement="bottom-start"
              trigger="click"
            >
              <button className="btn btn-main">
                <i className="ph ph-list me-8"></i>
                Menü
              </button>
            </Popover>

            <Popover
              content={
                <div>
                  <a href="#" className="popover-item item-hover">
                    <i className="ph ph-bell"></i>
                    Bildirimler
                    <span className="badge bg-danger-600 text-white">3</span>
                  </a>
                  <a href="#" className="popover-item item-hover">
                    <i className="ph ph-envelope"></i>
                    Mesajlar
                  </a>
                  <a href="#" className="popover-item item-hover">
                    <i className="ph ph-calendar"></i>
                    Takvim
                  </a>
                  <div className="text-center pt-8 border-top border-neutral-30 mt-8">
                    <small className="text-neutral-600">
                      ✓ İçerik üzerinde hover yapabilirsiniz
                      <br />✓ Boşluk geçişlerinde kapanmaz (150ms delay)
                      <br />✓ Açılış ve kapanış animasyonları
                    </small>
                  </div>
                </div>
              }
              placement="bottom"
              trigger="hover"
              backdrop={true}
            >
              <button className="btn btn-outline-main">
                <i className="ph ph-user-circle me-8"></i>
                Hover Menü (Header Gibi)
              </button>
            </Popover>
          </div>
        </div>

        {/* Basic Popover Examples */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Temel Kullanım</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center justify-content-center">
            <Popover content="Bu basit bir popover içeriğidir." placement="top">
              <button className="btn btn-main">
                <i className="ph ph-info me-8"></i>
                Üstte Göster
              </button>
            </Popover>

            <Popover content="Alt tarafta görünen popover" placement="bottom">
              <button className="btn btn-outline-main">
                <i className="ph ph-arrow-down me-8"></i>
                Altta Göster
              </button>
            </Popover>

            <Popover content="Solda görünen popover içeriği" placement="left">
              <button className="btn btn-white">
                <i className="ph ph-arrow-left me-8"></i>
                Solda Göster
              </button>
            </Popover>

            <Popover content="Sağda görünen popover" placement="right">
              <button className="btn btn-outline-white">
                <i className="ph ph-arrow-right me-8"></i>
                Sağda Göster
              </button>
            </Popover>
          </div>
        </div>

        {/* Placement Test Examples */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Konumlandırma Testleri</h3>
          <div className="row justify-content-center">
            <div className="col-10">
              {/* Grid Test Layout */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "60px",
                  padding: "60px 20px",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                {/* Top Row */}
                <Popover
                  content={
                    <div>
                      <strong>Top Start</strong>
                      <br />
                      Header submenu gibi sol hizalı
                    </div>
                  }
                  placement="top-start"
                >
                  <button className="btn btn-sm btn-main">Top Start</button>
                </Popover>

                <Popover
                  content={
                    <div>
                      <strong>Top Center</strong>
                      <br />
                      Butonun ortasında hizalı
                    </div>
                  }
                  placement="top"
                >
                  <button className="btn btn-sm btn-main">Top Center</button>
                </Popover>

                <Popover
                  content={
                    <div>
                      <strong>Top End</strong>
                      <br />
                      Sağ tarafa hizalı
                    </div>
                  }
                  placement="top-end"
                >
                  <button className="btn btn-sm btn-main">Top End</button>
                </Popover>

                {/* Middle Row */}
                <Popover content="Left - Solda açılır" placement="left">
                  <button className="btn btn-sm btn-outline-main">Left</button>
                </Popover>

                <div className="text-center">
                  <span className="badge bg-neutral-100 text-neutral-700 px-16 py-8">
                    Test Merkezi
                  </span>
                </div>

                <Popover content="Right - Sağda açılır" placement="right">
                  <button className="btn btn-sm btn-outline-main">Right</button>
                </Popover>

                {/* Bottom Row */}
                <Popover
                  content="Bottom Start - Sol alt köşeye hizalı"
                  placement="bottom-start"
                >
                  <button className="btn btn-sm btn-white">Bottom Start</button>
                </Popover>

                <Popover
                  content="Bottom Center - Merkeze hizalı"
                  placement="bottom"
                >
                  <button className="btn btn-sm btn-white">
                    Bottom Center
                  </button>
                </Popover>

                <Popover
                  content="Bottom End - Sağ alt köşeye hizalı"
                  placement="bottom-end"
                >
                  <button className="btn btn-sm btn-white">Bottom End</button>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        {/* With Title */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Başlıklı Popover</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Popover
              title="Bilgi"
              content="Bu popover bir başlığa sahiptir ve daha detaylı bilgi içerebilir."
              placement="top"
            >
              <button className="btn btn-main">
                <i className="ph ph-question me-8"></i>
                Bilgi Al
              </button>
            </Popover>

            <Popover
              title="Uyarı Mesajı"
              content={
                <div>
                  <p className="mb-12">Bu işlem geri alınamaz!</p>
                  <div className="d-flex gap-8">
                    <button className="btn btn-sm btn-danger">Sil</button>
                    <button className="btn btn-sm btn-outline-neutral">
                      İptal
                    </button>
                  </div>
                </div>
              }
              placement="bottom"
            >
              <button className="btn btn-danger">
                <i className="ph ph-trash me-8"></i>
                Sil
              </button>
            </Popover>
          </div>
        </div>

        {/* Variants */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Farklı Varyantlar</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Popover
              title="Başarılı"
              content="İşlem başarıyla tamamlandı!"
              variant="success"
              placement="top"
            >
              <button className="btn btn-success">
                <i className="ph ph-check me-8"></i>
                Başarılı
              </button>
            </Popover>

            <Popover
              title="Uyarı"
              content="Dikkat edilmesi gereken bir durum var."
              variant="warning"
              placement="top"
            >
              <button className="btn btn-warning">
                <i className="ph ph-warning me-8"></i>
                Uyarı
              </button>
            </Popover>

            <Popover
              title="Hata"
              content="Bir hata oluştu, lütfen tekrar deneyin."
              variant="danger"
              placement="top"
            >
              <button className="btn btn-danger">
                <i className="ph ph-x-circle me-8"></i>
                Hata
              </button>
            </Popover>

            <Popover
              title="Bilgi"
              content="Ek bilgi için bu popover'ı kullanabilirsiniz."
              variant="info"
              placement="top"
            >
              <button className="btn btn-info">
                <i className="ph ph-info me-8"></i>
                Bilgi
              </button>
            </Popover>

            <Popover
              title="Koyu Tema"
              content="Bu koyu tema popover örneğidir."
              variant="dark"
              placement="top"
            >
              <button className="btn btn-dark">
                <i className="ph ph-moon me-8"></i>
                Koyu Tema
              </button>
            </Popover>
          </div>
        </div>

        {/* Sizes */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Farklı Boyutlar</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Popover
              title="Küçük"
              content="Bu küçük boyutlu popover."
              size="sm"
              placement="top"
            >
              <button className="btn btn-sm btn-main">Küçük</button>
            </Popover>

            <Popover
              title="Orta"
              content="Bu orta boyutlu popover (varsayılan)."
              size="md"
              placement="top"
            >
              <button className="btn btn-main">Orta</button>
            </Popover>

            <Popover
              title="Büyük"
              content="Bu büyük boyutlu popover. Daha fazla içerik için idealdir ve daha geniş alan kaplar."
              size="lg"
              placement="top"
            >
              <button className="btn btn-lg btn-main">Büyük</button>
            </Popover>
          </div>
        </div>

        {/* Trigger Types */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Farklı Tetikleme Yöntemleri</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Popover
              content="Tıklayarak açılan popover (varsayılan)"
              trigger="click"
              placement="top"
            >
              <button className="btn btn-main">
                <i className="ph ph-cursor me-8"></i>
                Tıkla
              </button>
            </Popover>

            <Popover
              content="Fare ile üzerine gelince açılan popover"
              trigger="hover"
              placement="top"
            >
              <button className="btn btn-outline-main">
                <i className="ph ph-hand me-8"></i>
                Hover
              </button>
            </Popover>

            <Popover
              content="Focus ile açılan popover"
              trigger="focus"
              placement="top"
            >
              <button className="btn btn-white">
                <i className="ph ph-target me-8"></i>
                Focus
              </button>
            </Popover>
          </div>
        </div>

        {/* Placement Variations */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Gelişmiş Konumlandırma</h3>
          <div className="d-flex flex-wrap gap-16 align-items-center">
            <Popover content="Top start" placement="top-start">
              <button className="btn btn-sm btn-outline-main">Top Start</button>
            </Popover>

            <Popover content="Top center" placement="top">
              <button className="btn btn-sm btn-outline-main">Top</button>
            </Popover>

            <Popover content="Top end" placement="top-end">
              <button className="btn btn-sm btn-outline-main">Top End</button>
            </Popover>

            <Popover content="Bottom start" placement="bottom-start">
              <button className="btn btn-sm btn-outline-main">
                Bottom Start
              </button>
            </Popover>

            <Popover content="Bottom center" placement="bottom">
              <button className="btn btn-sm btn-outline-main">Bottom</button>
            </Popover>

            <Popover content="Bottom end" placement="bottom-end">
              <button className="btn btn-sm btn-outline-main">
                Bottom End
              </button>
            </Popover>

            <Popover content="Left start" placement="left-start">
              <button className="btn btn-sm btn-outline-main">
                Left Start
              </button>
            </Popover>

            <Popover content="Left center" placement="left">
              <button className="btn btn-sm btn-outline-main">Left</button>
            </Popover>

            <Popover content="Left end" placement="left-end">
              <button className="btn btn-sm btn-outline-main">Left End</button>
            </Popover>

            <Popover content="Right start" placement="right-start">
              <button className="btn btn-sm btn-outline-main">
                Right Start
              </button>
            </Popover>

            <Popover content="Right center" placement="right">
              <button className="btn btn-sm btn-outline-main">Right</button>
            </Popover>

            <Popover content="Right end" placement="right-end">
              <button className="btn btn-sm btn-outline-main">Right End</button>
            </Popover>
          </div>
        </div>

        {/* Dropdown Menu Style */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Dropdown Menü Stili</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Popover
              content={
                <div>
                  <a href="#" className="popover-item">
                    <i className="ph ph-house me-8"></i>
                    Ana Sayfa
                  </a>
                  <a href="#" className="popover-item active">
                    <i className="ph ph-user me-8"></i>
                    Profil
                  </a>
                  <a href="#" className="popover-item">
                    <i className="ph ph-gear me-8"></i>
                    Ayarlar
                  </a>
                  <hr className="my-4" />
                  <a href="#" className="popover-item">
                    <i className="ph ph-sign-out me-8"></i>
                    Çıkış Yap
                  </a>
                </div>
              }
              placement="bottom-start"
              trigger="click"
            >
              <button className="btn btn-outline-main">
                <i className="ph ph-list me-8"></i>
                Menü
              </button>
            </Popover>

            <Popover
              content={
                <div>
                  <a href="#" className="popover-item">
                    <i className="ph ph-bell me-8"></i>
                    Bildirimler
                    <span className="badge bg-danger-600 text-white ms-auto">
                      3
                    </span>
                  </a>
                  <a href="#" className="popover-item">
                    <i className="ph ph-envelope me-8"></i>
                    Mesajlar
                    <span className="badge bg-main-600 text-white ms-auto">
                      12
                    </span>
                  </a>
                  <a href="#" className="popover-item">
                    <i className="ph ph-bookmark me-8"></i>
                    Kaydedilenler
                  </a>
                </div>
              }
              placement="bottom"
              trigger="click"
            >
              <button className="btn btn-main">
                <i className="ph ph-bell me-8"></i>
                Bildirimler
              </button>
            </Popover>
          </div>
        </div>

        {/* Complex Content */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Karmaşık İçerik</h3>
          <div className="d-flex flex-wrap gap-24 align-items-center">
            <Popover
              title="Kullanıcı Profili"
              content={
                <div>
                  <div className="d-flex align-items-center gap-12 mb-16">
                    <div className="w-40 h-40 bg-main-100 rounded-50 flex-center">
                      <i className="ph ph-user text-main-600"></i>
                    </div>
                    <div>
                      <h6 className="mb-4">Ahmet Yılmaz</h6>
                      <p className="text-sm text-neutral-600 mb-0">
                        Frontend Developer
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-8">
                    <button className="btn btn-sm btn-main">Profil</button>
                    <button className="btn btn-sm btn-outline-main">
                      Mesaj
                    </button>
                  </div>
                </div>
              }
              placement="bottom"
              size="lg"
            >
              <div className="d-flex align-items-center gap-8 p-12 bg-neutral-50 rounded-8 cursor-pointer">
                <div className="w-32 h-32 bg-main-100 rounded-50 flex-center">
                  <i className="ph ph-user text-main-600"></i>
                </div>
                <span className="text-sm">Kullanıcı</span>
              </div>
            </Popover>

            <Popover
              title="Hızlı Eylemler"
              content={
                <div>
                  <a href="#" className="popover-item">
                    <i className="ph ph-pencil me-8"></i>
                    Düzenle
                  </a>
                  <a href="#" className="popover-item">
                    <i className="ph ph-copy me-8"></i>
                    Kopyala
                  </a>
                  <a href="#" className="popover-item">
                    <i className="ph ph-share me-8"></i>
                    Paylaş
                  </a>
                  <hr className="my-8" />
                  <a href="#" className="popover-item text-danger-600">
                    <i className="ph ph-trash me-8"></i>
                    Sil
                  </a>
                </div>
              }
              placement="bottom-end"
              trigger="click"
            >
              <button className="btn btn-white">
                <i className="ph ph-dots-three-vertical"></i>
              </button>
            </Popover>
          </div>
        </div>

        {/* With Icons and Text */}
        <div className="col-12 mb-60">
          <h3 className="h4 text-heading mb-32">Metin ve İkonlarla</h3>
          <div className="bg-white p-32 rounded-16 box-shadow-md">
            <p className="text-body mb-16">
              Bu bir örnek paragraftır.
              <Popover
                content="Bu kelime hakkında ek bilgi"
                placement="top"
                trigger="hover"
              >
                <span className="text-main-600 text-decoration-underline cursor-pointer">
                  önemli
                </span>
              </Popover>{" "}
              bir konuyu açıklamaktadır. Popover ile ek bilgiler sağlanabilir.
            </p>

            <div className="d-flex align-items-center gap-16">
              <span>Sosyal medya:</span>

              <Popover
                content="Twitter'da takip et"
                placement="top"
                trigger="hover"
              >
                <a href="#" className="text-info-600 hover-text-info-700">
                  <i
                    className="ph ph-twitter-logo"
                    style={{ fontSize: "20px" }}
                  ></i>
                </a>
              </Popover>

              <Popover
                content="LinkedIn'de bağlan"
                placement="top"
                trigger="hover"
              >
                <a href="#" className="text-primary-600 hover-text-primary-700">
                  <i
                    className="ph ph-linkedin-logo"
                    style={{ fontSize: "20px" }}
                  ></i>
                </a>
              </Popover>

              <Popover
                content="GitHub'da görüntüle"
                placement="top"
                trigger="hover"
              >
                <a href="#" className="text-neutral-800 hover-text-neutral-900">
                  <i
                    className="ph ph-github-logo"
                    style={{ fontSize: "20px" }}
                  ></i>
                </a>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Information */}
      <div className="bg-main-25 p-40 rounded-16 mt-60">
        <h3 className="h4 text-heading mb-24">Kullanım Bilgileri</h3>
        <div className="row">
          <div className="col-lg-6 mb-24 mb-lg-0">
            <h5 className="text-heading mb-16">Temel Props:</h5>
            <ul className="text-body">
              <li>
                <strong>content:</strong> Popover içeriği (React.ReactNode)
              </li>
              <li>
                <strong>title:</strong> Popover başlığı (opsiyonel)
              </li>

              <li>
                <strong>placement:</strong> Konum (top, bottom, left, right +
                start/end)
              </li>
              <li>
                <strong>trigger:</strong> Tetikleme yöntemi (click, hover,
                focus)
              </li>
              <li>
                <strong>variant:</strong> Tema (default, success, warning,
                danger, info, dark)
              </li>
              <li>
                <strong>size:</strong> Boyut (sm, md, lg)
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <h5 className="text-heading mb-16">Özellikler:</h5>
            <ul className="text-body">
              <li>✅ Responsive tasarım</li>
              <li>✅ Keyboard navigasyonu</li>
              <li>✅ Accessibility desteği</li>
              <li>✅ Portal rendering</li>
              <li>✅ Viewport collision detection</li>
              <li>✅ Smooth animasyonlar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopoverExamples;
