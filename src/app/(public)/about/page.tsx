"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import {
  AboutHeroSection,
  AboutStatsSection,
  AboutValuesSection,
  MissionVisionSection,
  ParentAppSection,
  InstitutionModulesSection,
} from "./_shared/sections";
import { parentFeatures, institutionFeatures } from "./_shared/config";

/* ── Hikayemiz / Story adımları ── */
const storySteps = [
  {
    number: "01",
    icon: "ph-bold ph-lightbulb",
    title: "Fikir Doğdu",
    desc: "Veli olarak doğru eğitim kurumunu bulmak ne kadar zordu? Binlerce seçenek, dağınık bilgiler, belirsiz fiyatlar. Bu sorunu çözmek için yola çıktık.",
    details: [
      "Velilerin %74'ü eğitim seçiminde yeterli bilgiye ulaşamıyor",
      "Kurumların %60'ının dijital varlığı yetersiz",
      "Randevu ve iletişim süreçleri hâlâ telefon bağımlılığında",
    ],
    gradient: "linear-gradient(135deg, var(--main-600), #6c5ce7)",
    color: "var(--main-600)",
  },
  {
    number: "02",
    icon: "ph-bold ph-code",
    title: "Platform İnşa Ettik",
    desc: "Velilerin ihtiyaçlarını ve eğitim kurumlarının beklentilerini dinledik. İki tarafı da memnun eden, şeffaf ve kullanıcı dostu bir platform geliştirdik.",
    details: [
      "500+ kurum ile beta sürecini tamamladık",
      "10.000+ veli geri bildirimi değerlendirdik",
      "Modern teknoloji yığınıyla ölçeklenebilir altyapı",
    ],
    gradient: "linear-gradient(135deg, var(--main-two-600), #f7931e)",
    color: "var(--main-two-600)",
  },
  {
    number: "03",
    icon: "ph-bold ph-chart-line-up",
    title: "Büyümeye Devam Ediyoruz",
    desc: "Türkiye genelinde eğitim sektörünün dijital dönüşümüne öncülük ediyor, her gün daha fazla kurum ve veliye ulaşıyoruz.",
    details: [
      "81 ilde aktif kurum ağı",
      "Yapay zeka destekli eşleştirme sistemi yolda",
      "Kurumsal API entegrasyonları ve mobil uygulama",
    ],
    gradient: "linear-gradient(135deg, var(--main-three-600), #00cec9)",
    color: "var(--main-three-600)",
  },
];

/* ── Kimler kullanıyor ── */
const audiences = [
  {
    icon: "ph-bold ph-users",
    title: "Veliler",
    desc: "Çocukları için en uygun eğitim kurumunu kolayca bulan, karşılaştıran ve randevu alan aileler.",
    features: [
      "Ücretsiz kurum arama",
      "Detaylı profil karşılaştırma",
      "Online randevu",
    ],
    href: "/search",
    btnText: "Kurumları Keşfet",
    color: "var(--main-600)",
  },
  {
    icon: "ph-bold ph-buildings",
    title: "Eğitim Kurumları",
    desc: "Dijital görünürlük kazanan, başvuruları yöneten ve veli memnuniyetini artıran kurumlar.",
    features: [
      "Kurum profili oluşturma",
      "Başvuru & randevu yönetimi",
      "Analitik raporlar",
    ],
    href: "/auth/register/institution",
    btnText: "Kurumunuzu Kaydedin",
    color: "var(--main-two-600)",
  },
  {
    icon: "ph-bold ph-storefront",
    title: "Tedarikçiler",
    desc: "Eğitim sektörüne ürün ve hizmet satan firmalar için özel B2B tedarik platformu.",
    features: [
      "Ürün & hizmet kataloğu",
      "RFQ sistemi ile teklif",
      "Onaylı kurum ağı",
    ],
    href: "/supply-panel",
    btnText: "Tedarik Paneline Gir",
    color: "var(--main-three-600)",
  },
];

const AboutPage = () => {
  usePageTitle("Hakkımızda");

  return (
    <div className="category-detail-page">
      <div className="container">
        {/* ── 1. Hero ── */}
        <AboutHeroSection />

        {/* ── 2. İstatistikler ── */}
        <AboutStatsSection />

        {/* ── 3. Hikayemiz ── */}
        <div className="hiw-steps-detail">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Hikayemiz</h2>
            <p className="section-header__subtitle">
              Sıradan bir fikirden, binlerce kullanıcının güvendiği platforma
            </p>
          </div>

          {storySteps.map((step, i) => (
            <div
              key={i}
              className={`hiw-steps-detail__step ${i % 2 !== 0 ? "hiw-steps-detail__step--reverse" : ""}`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="hiw-steps-detail__step-visual">
                <div
                  className="hiw-steps-detail__step-number"
                  style={{ background: step.gradient }}
                >
                  {step.number}
                </div>
                <div
                  className="hiw-steps-detail__step-icon"
                  style={{ background: step.gradient }}
                >
                  <i className={step.icon} />
                </div>
              </div>
              <div className="hiw-steps-detail__step-content">
                <h3
                  className="hiw-steps-detail__step-title"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>
                <p className="hiw-steps-detail__step-desc">{step.desc}</p>
                <ul className="hiw-steps-detail__step-list">
                  {step.details.map((detail, di) => (
                    <li key={di}>
                      <i
                        className="ph-bold ph-check-circle"
                        style={{ color: step.color }}
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── 4. Misyon & Vizyon ── */}
        <MissionVisionSection />

        {/* ── 5. Değerlerimiz ── */}
        <AboutValuesSection />

        {/* ── 6. Kimler İçin? ── */}
        <div className="hiw-audiences">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Kimler İçin?</h2>
            <p className="section-header__subtitle">
              Eğitim İste herkese açık, herkes için değer üretir
            </p>
          </div>
          <div className="hiw-audiences__grid">
            {audiences.map((aud, i) => (
              <div
                key={i}
                className="hiw-audiences__card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div
                  className="hiw-audiences__card-icon"
                  style={{ color: aud.color }}
                >
                  <i className={aud.icon} />
                </div>
                <h4 className="hiw-audiences__card-title">{aud.title}</h4>
                <p className="hiw-audiences__card-desc">{aud.desc}</p>
                <ul className="hiw-audiences__card-features">
                  {aud.features.map((f, fi) => (
                    <li key={fi}>
                      <i className="ph ph-check" style={{ color: aud.color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={aud.href}
                  className="btn btn-outline-main rounded-pill flex-align gap-8 d-inline-flex mt-auto"
                >
                  {aud.btnText}
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7. Veliler İçin Özellikler ── */}
        <div className="about-features-wrap">
          <div className="section-header" data-aos="fade-up">
            <div
              className="category-hero__badge"
              style={{ marginBottom: 12, display: "inline-flex" }}
            >
              <i className="ph-bold ph-users" />
              Veliler İçin
            </div>
            <h2 className="section-header__title">Veliler İçin Özellikler</h2>
            <p className="section-header__subtitle">
              Çocuğunuz için en doğru eğitim kurumunu bulmanın kolay yolu
            </p>
          </div>
          <div className="row row-gap-24">
            {parentFeatures.map((feature, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={Math.floor(index / 3) * 80 + (index % 3) * 60}
              >
                <div className="feature-card">
                  <div className="feature-card__icon-wrapper">
                    <div className={`feature-card__icon ${feature.iconClass}`}>
                      <i className={`ph-bold ${feature.icon}`} />
                    </div>
                  </div>
                  <h4 className="feature-card__title">{feature.title}</h4>
                  <p className="feature-card__description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 8. Mobil Uygulama ── */}
        <div className="mb-56">
          <ParentAppSection />
        </div>

        {/* ── 9. Kurumlar İçin Özellikler ── */}
        <div className="about-features-wrap">
          <div className="section-header" data-aos="fade-up">
            <div
              className="category-hero__badge category-hero__badge--dark"
              style={{ marginBottom: 12, display: "inline-flex" }}
            >
              <i className="ph-bold ph-buildings" />
              Kurumlar İçin
            </div>
            <h2 className="section-header__title">
              Eğitim Kurumları İçin Özellikler
            </h2>
            <p className="section-header__subtitle">
              Kurumunuzu dijital dünyada öne çıkarın ve büyütün
            </p>
          </div>
          <div className="row row-gap-24">
            {institutionFeatures.map((feature, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={Math.floor(index / 3) * 80 + (index % 3) * 60}
              >
                <div className="feature-card">
                  <div className="feature-card__icon-wrapper">
                    <div className={`feature-card__icon ${feature.iconClass}`}>
                      <i className={`ph-bold ${feature.icon}`} />
                    </div>
                  </div>
                  <h4 className="feature-card__title">{feature.title}</h4>
                  <p className="feature-card__description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 10. Yönetim Modülleri ── */}
        <InstitutionModulesSection />

        {/* ── 11. CTA ── */}
        <div className="category-cta" data-aos="fade-up">
          <div className="category-cta__inner">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-graduation-cap" />
              </div>
              <h3 className="category-cta__title">
                Doğru Eğitim Kurumunu Bulmaya Hazır mısınız?
              </h3>
              <p className="category-cta__desc">
                500&apos;den fazla kurum arasından çocuğunuza en uygun eğitimi
                keşfedin. Ücretsiz hesap açın, hemen başlayın.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/search"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
                  Eğitim Ara
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/auth/register"
                  className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-user-plus d-flex text-lg" />
                  Ücretsiz Kayıt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
