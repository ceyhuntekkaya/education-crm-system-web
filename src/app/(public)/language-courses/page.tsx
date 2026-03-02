"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const languages = [
  {
    flag: "🇬🇧",
    name: "İngilizce",
    count: "Yüksek",
    code: "EN",
    href: "/auth/register",
    certifications: "Sertifika Modülü",
  },
  {
    flag: "🇩🇪",
    name: "Almanca",
    count: "Yüksek",
    code: "DE",
    href: "/auth/register",
    certifications: "Kur Takibi",
  },
  {
    flag: "🇫🇷",
    name: "Fransızca",
    count: "Orta",
    code: "FR",
    href: "/auth/register",
    certifications: "Sınav Yönetimi",
  },
  {
    flag: "🇪🇸",
    name: "İspanyolca",
    count: "Orta",
    code: "ES",
    href: "/auth/register",
    certifications: "Materyal Desteği",
  },
  {
    flag: "🇯🇵",
    name: "Japonca",
    count: "Özel",
    code: "JP",
    href: "/auth/register",
    certifications: "Alfabe Eğitimi",
  },
  {
    flag: "🇷🇺",
    name: "Rusça",
    count: "Özel",
    code: "RU",
    href: "/auth/register",
    certifications: "Pratik Odaklı",
  },
  {
    flag: "🇸🇦",
    name: "Arapça",
    count: "Özel",
    code: "AR",
    href: "/auth/register",
    certifications: "Grammer Modülü",
  },
  {
    flag: "🇨🇳",
    name: "Çince",
    count: "Özel",
    code: "CN",
    href: "/auth/register",
    certifications: "Tonlama Analizi",
  },
];

const stats = [
  {
    end: 150,
    suffix: "+",
    label: "Kurumsal Üye",
    icon: "ph-bold ph-buildings",
  },
  { end: 12, suffix: "", label: "Dil Desteği", icon: "ph-bold ph-globe" },
  {
    end: 25000,
    suffix: "+",
    label: "Yönetilen Öğrenci",
    icon: "ph-bold ph-student",
  },
  {
    end: 98,
    suffix: "%",
    label: "Kurum Memnuniyeti",
    icon: "ph-bold ph-heart",
  },
];

const features = [
  {
    icon: "ph-bold ph-certificate",
    title: "Sertifika Baskısı",
    desc: "Tamamlanan kurlar için otomatik sertifika oluşturun ve öğrencilerinize dijital/basılı olarak sunun.",
  },
  {
    icon: "ph-bold ph-users-three",
    title: "Sınıf & Kur Yönetimi",
    desc: "Öğrencileri seviyelerine göre sınıflara atayın, yeni kurlar açın ve kontenjan takibi yapın.",
  },
  {
    icon: "ph-bold ph-monitor-play",
    title: "Hibrit Eğitim Modülü",
    desc: "Hem yüz yüze hem de online derslerinizi tek panelden planlayın, Zoom entegrasyonu ile yayın yapın.",
  },
  {
    icon: "ph-bold ph-trend-up",
    title: "Gelişim Raporları",
    desc: "Öğrencilerin 4 temel becerideki (okuma, yazma, dinleme, konuşma) gelişimini grafiklerle raporlayın.",
  },
  {
    icon: "ph-bold ph-chats",
    title: "Speaking Club Planlama",
    desc: "Konuşma kulübü etkinliklerinizi takvime işleyin, katılımı takip edin ve eğitmen atayın.",
  },
  {
    icon: "ph-bold ph-device-mobile",
    title: "Mobil Uygulama",
    desc: "Kendi markanızla mobil uygulama üzerinden öğrencilerinize ödev ve materyal gönderin.",
  },
];

const levels = [
  { level: "A1", name: "Başlangıç", desc: "Temel ifadeler ve günlük iletişim" },
  { level: "A2", name: "Temel", desc: "Basit görevler ve doğrudan iletişim" },
  { level: "B1", name: "Orta", desc: "Bağımsız genel konularda iletişim" },
  { level: "B2", name: "Orta Üstü", desc: "Akıcı ve detaylı iletişim" },
  {
    level: "C1",
    name: "İleri",
    desc: "Karmaşık konularda profesyonel iletişim",
  },
  { level: "C2", name: "Ustalaşma", desc: "Ana dil düzeyinde ustalık" },
];

const faqs = [
  {
    q: "Hangi diller için müfredat desteği sağlıyorsunuz?",
    a: "İngilizce (A1-C2), Almanca, Fransızca, İspanyolca ve diğer popüler diller için AB standartlarında hazır müfredat yapıları sistemde mevcuttur.",
  },
  {
    q: "Online dersler için hangi platformları destekliyorsunuz?",
    a: "Zoom, Microsoft Teams ve Google Meet entegrasyonlarımız mevcuttur. Ders linkleri otomatik oluşur ve öğrencilere iletilir.",
  },
  {
    q: "Kur bitirme sınavlarını sistem üzerinden yapabilir miyim?",
    a: "Evet, soru bankası modülü ile online sınavlar oluşturabilir, otomatik değerlendirme yapabilir ve karne basabilirsiniz.",
  },
  {
    q: "Ödeme takibi yapabilir miyim?",
    a: "Taksitlendirme, ödeme hatırlatma ve fatura kesme işlemleri Finans modülü üzerinden kolayca yönetilebilir.",
  },
];

export default function LanguageCoursesPage() {
  usePageTitle("Dil Kursları");
  const [viewed, setViewed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="category-detail-page category-detail-page--dark">
      <div className="container">
        {/* Hero Section */}
        <div className="category-hero" data-aos="fade-up">
          <div className="category-hero__badge category-hero__badge--dark">
            <i className="ph-bold ph-translate" />
            Dil Eğitimi
          </div>
          <h1
            className="category-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Dil Kursu Yönetiminde{" "}
            <span style={{ color: "var(--main-400)" }}>Dijital Dönüşüm</span>
          </h1>
          <p
            className="category-hero__desc"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Kayıt, tahsilat, kur takibi ve materyal yönetimini tek platformda
            birleştirin. Dil okulları için özel olarak tasarlanmış CRM altyapısı
            ile işinizi büyütün.
          </p>
          <div
            className="category-hero__actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/auth/register"
              className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-rocket-launch d-flex text-lg" />
              Ücretsiz Deneyin
            </Link>
            <Link
              href="/how-it-works"
              className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex"
            >
              <i className="ph-bold ph-path d-flex text-lg" />
              Nasıl Çalışır?
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <VisibilitySensor
          onChange={(isVisible: boolean) => {
            if (isVisible) setViewed(true);
          }}
          partialVisibility
          delayedCall
        >
          <div className="category-stats" data-aos="fade-up">
            {stats.map((s, i) => (
              <div
                key={i}
                className="category-stats__card"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="category-stats__icon">
                  <i className={s.icon} />
                </div>
                <span className="category-stats__value">
                  {viewed ? (
                    <CountUp
                      end={s.end}
                      duration={2.4}
                      separator="."
                      suffix={s.suffix}
                    />
                  ) : (
                    `0${s.suffix}`
                  )}
                </span>
                <span className="category-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </VisibilitySensor>

        {/* Languages Grid */}
        <div className="category-grid-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Dile Göre Kurslar</h2>
            <p className="section-header__subtitle">
              Öğrenmek istediğiniz dili seçin ve en iyi kurumlara ulaşın
            </p>
          </div>
          <div className="lang-page-grid">
            {languages.map((lang, idx) => (
              <Link
                href={lang.href}
                key={idx}
                className="lang-page-grid__card"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <span className="lang-page-grid__card-flag">{lang.flag}</span>
                <div className="lang-page-grid__card-body">
                  <h4 className="lang-page-grid__card-name">{lang.name}</h4>
                  <span className="lang-page-grid__card-count">
                    {lang.count} kurum
                  </span>
                  <span className="lang-page-grid__card-certs">
                    {lang.certifications}
                  </span>
                </div>
                <i className="ph-bold ph-arrow-right lang-page-grid__card-arrow" />
              </Link>
            ))}
          </div>
        </div>

        {/* Levels Section */}
        <div className="category-levels">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Dil Seviyeleri (CEFR)</h2>
            <p className="section-header__subtitle">
              Avrupa Ortak Dil Çerçevesi&apos;ne göre seviyenizi belirleyin
            </p>
          </div>
          <div className="category-levels__grid">
            {levels.map((lv, i) => (
              <div
                key={i}
                className="category-levels__card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="category-levels__card-level">{lv.level}</div>
                <h5 className="category-levels__card-name">{lv.name}</h5>
                <p className="category-levels__card-desc">{lv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="category-advantages">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">
              Dil Eğitiminde Fark Yaratan Özellikler
            </h2>
            <p className="section-header__subtitle">
              Eğitim İste ile dil öğrenmenin avantajları
            </p>
          </div>
          <div className="category-advantages__grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="category-advantages__card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="category-advantages__card-icon">
                  <i className={f.icon} />
                </div>
                <h5 className="category-advantages__card-title">{f.title}</h5>
                <p className="category-advantages__card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="category-faq">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Sıkça Sorulan Sorular</h2>
            <p className="section-header__subtitle">
              Dil kursları hakkında merak ettikleriniz
            </p>
          </div>
          <div className="category-faq__list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`category-faq__item ${openFaq === i ? "category-faq__item--open" : ""}`}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <button
                  className="category-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`ph-bold ${openFaq === i ? "ph-minus" : "ph-plus"}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="category-faq__answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="category-cta" data-aos="fade-up">
          <div className="category-cta__inner category-cta__inner--language">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-translate" />
              </div>
              <h3 className="category-cta__title">
                Yeni Bir Dil, Yeni Bir Dünya
              </h3>
              <p className="category-cta__desc">
                600&apos;den fazla dil kursu arasından size en uygun programı
                bulun ve dünyaya kapınızı açın.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/search"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
                  Hemen Dil Kursu Ara
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-path d-flex text-lg" />
                  Nasıl Çalışır?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
