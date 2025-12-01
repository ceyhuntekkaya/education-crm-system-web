"use client";

import { usePageTitle } from "@/hooks";
import LegalPageLayout from "../_shared/LegalPageLayout";

const TermsPage = () => {
  usePageTitle("Kullanım Koşulları");

  return (
    <LegalPageLayout title="Kullanım Koşulları" lastUpdated="1 Aralık 2024">
      {/* Giriş */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">1</span>
          Giriş
        </h2>
        <p className="legal-section__text">
          Eğitim İste platformuna hoş geldiniz. Bu web sitesini veya
          hizmetlerimizi kullanarak, aşağıdaki kullanım koşullarını kabul etmiş
          sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.
        </p>
      </section>

      {/* Hizmet Tanımı */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">2</span>
          Hizmet Tanımı
        </h2>
        <p className="legal-section__text">
          Eğitim İste, öğrenciler ve eğitim kurumları arasında köprü kuran bir
          eğitim platformudur. Platformumuz aşağıdaki hizmetleri sunmaktadır:
        </p>
        <ul className="legal-section__list">
          <li>Eğitim kurumu arama ve karşılaştırma</li>
          <li>Randevu oluşturma ve yönetimi</li>
          <li>Eğitim danışmanlığı hizmetleri</li>
          <li>Kurs ve program bilgilendirmesi</li>
        </ul>
      </section>

      {/* Kullanıcı Sorumlulukları */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">3</span>
          Kullanıcı Sorumlulukları
        </h2>
        <p className="legal-section__text">
          Platformumuzu kullanırken aşağıdaki kurallara uymanız gerekmektedir:
        </p>
        <ul className="legal-section__list">
          <li>Doğru ve güncel bilgiler sağlamak</li>
          <li>Hesap güvenliğinizi korumak</li>
          <li>Diğer kullanıcıların haklarına saygı göstermek</li>
          <li>Yasadışı faaliyetlerde bulunmamak</li>
        </ul>
      </section>

      {/* Fikri Mülkiyet */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">4</span>
          Fikri Mülkiyet Hakları
        </h2>
        <p className="legal-section__text">
          Platformumuzdaki tüm içerikler, tasarımlar, logolar ve diğer
          materyaller Eğitim İste&apos;nin mülkiyetindedir ve telif hakları ile
          korunmaktadır. İzinsiz kullanım yasaktır.
        </p>
      </section>

      {/* Sorumluluk Sınırlaması */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">5</span>
          Sorumluluk Sınırlaması
        </h2>
        <p className="legal-section__text">
          Eğitim İste, platform üzerinden sağlanan bilgilerin doğruluğunu
          garanti etmez. Eğitim kurumları ile yapılan anlaşmalar tamamen
          kullanıcı ve kurum arasındadır.
        </p>
      </section>

      {/* Değişiklikler */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">6</span>
          Koşullardaki Değişiklikler
        </h2>
        <p className="legal-section__text">
          Bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını saklı
          tutarız. Değişiklikler web sitemizde yayınlandığı anda yürürlüğe
          girer.
        </p>
      </section>

      {/* İletişim */}
      <section className="legal-section">
        <h2 className="legal-section__title">
          <span className="legal-section__number">7</span>
          İletişim
        </h2>
        <p className="legal-section__text">
          Kullanım koşulları hakkında sorularınız için bizimle iletişime
          geçebilirsiniz:
        </p>
        <div className="legal-section__contact">
          <div className="legal-section__contact-item">
            <i className="ph ph-envelope" />
            <span>info@egitimiste.com</span>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
};

export default TermsPage;
