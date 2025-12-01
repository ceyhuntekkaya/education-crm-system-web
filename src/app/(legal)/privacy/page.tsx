"use client";

import { usePageTitle } from "@/hooks";
import LegalPageLayout from "../_shared/LegalPageLayout";

const PrivacyPage = () => {
  usePageTitle("Gizlilik Politikası");

  return (
    <LegalPageLayout title="Gizlilik Politikası" lastUpdated="1 Aralık 2024">
      {/* Giriş */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">1</span>
          Giriş
        </h2>
        <p className="legal-section__text">
          Eğitim İste olarak, gizliliğinize önem veriyoruz. Bu gizlilik
          politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını
          ve korunduğunu açıklamaktadır.
        </p>
      </section>

      {/* Toplanan Veriler */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">2</span>
          Toplanan Veriler
        </h2>
        <p className="legal-section__text">
          Platformumuzu kullanırken aşağıdaki bilgileri toplayabiliriz:
        </p>
        <div className="legal-section__cards">
          <div className="legal-card">
            <div className="legal-card__icon">
              <i className="ph ph-user" />
            </div>
            <h3 className="legal-card__title">Kişisel Bilgiler</h3>
            <p className="legal-card__text">
              Ad, soyad, e-posta adresi, telefon numarası
            </p>
          </div>
          <div className="legal-card">
            <div className="legal-card__icon">
              <i className="ph ph-key" />
            </div>
            <h3 className="legal-card__title">Hesap Bilgileri</h3>
            <p className="legal-card__text">
              Kullanıcı adı, şifre (şifrelenmiş)
            </p>
          </div>
          <div className="legal-card">
            <div className="legal-card__icon">
              <i className="ph ph-graduation-cap" />
            </div>
            <h3 className="legal-card__title">Eğitim Bilgileri</h3>
            <p className="legal-card__text">
              Eğitim geçmişi, ilgi alanları, tercihler
            </p>
          </div>
          <div className="legal-card">
            <div className="legal-card__icon">
              <i className="ph ph-chart-line" />
            </div>
            <h3 className="legal-card__title">Kullanım Verileri</h3>
            <p className="legal-card__text">
              IP adresi, tarayıcı bilgisi, ziyaret edilen sayfalar
            </p>
          </div>
        </div>
      </section>

      {/* Verilerin Kullanımı */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">3</span>
          Verilerin Kullanım Amacı
        </h2>
        <p className="legal-section__text">
          Topladığımız verileri aşağıdaki amaçlarla kullanıyoruz:
        </p>
        <ul className="legal-section__list">
          <li>Hizmetlerimizi sunmak ve geliştirmek</li>
          <li>Size uygun eğitim önerileri sağlamak</li>
          <li>Randevu ve iletişim süreçlerini yönetmek</li>
          <li>Yasal yükümlülüklerimizi yerine getirmek</li>
        </ul>
      </section>

      {/* Veri Paylaşımı */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">4</span>
          Veri Paylaşımı
        </h2>
        <p className="legal-section__text">
          Kişisel verilerinizi aşağıdaki durumlar dışında üçüncü taraflarla
          paylaşmayız:
        </p>
        <ul className="legal-section__list">
          <li>Açık rızanız olduğunda</li>
          <li>Yasal zorunluluk durumunda</li>
          <li>Hizmet sağlayıcılarımızla (gizlilik sözleşmesi kapsamında)</li>
        </ul>
      </section>

      {/* Çerezler */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">5</span>
          Çerezler (Cookies)
        </h2>
        <p className="legal-section__text">
          Web sitemizde çerezler kullanmaktayız. Çerezler, deneyiminizi
          iyileştirmek ve site performansını analiz etmek için kullanılır.
          Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.
        </p>
      </section>

      {/* Veri Güvenliği */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">6</span>
          Veri Güvenliği
        </h2>
        <p className="legal-section__text">
          Verilerinizi korumak için endüstri standardı güvenlik önlemleri
          uyguluyoruz. Bunlar arasında SSL şifreleme, güvenli sunucular ve
          düzenli güvenlik denetimleri bulunmaktadır.
        </p>
        <div className="legal-section__highlight">
          <i className="ph ph-shield-check" />
          <span>256-bit SSL şifreleme ile korunmaktasınız</span>
        </div>
      </section>

      {/* Kullanıcı Hakları */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">7</span>
          Haklarınız (KVKK)
        </h2>
        <p className="legal-section__text">
          KVKK kapsamında aşağıdaki haklara sahipsiniz:
        </p>
        <ul className="legal-section__list legal-section__list--checked">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
          <li>Kişisel verilerinizin düzeltilmesini isteme</li>
          <li>Kişisel verilerinizin silinmesini talep etme</li>
        </ul>
      </section>

      {/* Değişiklikler */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">8</span>
          Politika Değişiklikleri
        </h2>
        <p className="legal-section__text">
          Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli
          değişiklikler yapıldığında sizi bilgilendireceğiz.
        </p>
      </section>

      {/* İletişim */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">9</span>
          İletişim
        </h2>
        <p className="legal-section__text">
          Gizlilik politikamız hakkında sorularınız için bizimle iletişime
          geçebilirsiniz:
        </p>
        <div className="legal-section__contact">
          <div className="legal-section__contact-item">
            <i className="ph ph-envelope" />
            <span>kvkk@egitimiste.com</span>
          </div>
          <div className="legal-section__contact-item">
            <i className="ph ph-map-pin" />
            <span>İstanbul, Türkiye</span>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPage;
