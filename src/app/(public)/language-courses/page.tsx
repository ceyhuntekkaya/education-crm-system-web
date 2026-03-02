"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const languages = [
  { flag: "🇬🇧", name: "İngilizce", count: 284, code: "EN", href: "/search?lang=en", certifications: "IELTS, TOEFL, Cambridge" },
  { flag: "🇩🇪", name: "Almanca", count: 98, code: "DE", href: "/search?lang=de", certifications: "Goethe, TestDaF, ÖSD" },
  { flag: "🇫🇷", name: "Fransızca", count: 76, code: "FR", href: "/search?lang=fr", certifications: "DELF, DALF, TCF" },
  { flag: "🇪🇸", name: "İspanyolca", count: 54, code: "ES", href: "/search?lang=es", certifications: "DELE, SIELE" },
  { flag: "🇯🇵", name: "Japonca", count: 32, code: "JP", href: "/search?lang=jp", certifications: "JLPT, NAT-TEST" },
  { flag: "🇷🇺", name: "Rusça", count: 41, code: "RU", href: "/search?lang=ru", certifications: "TORFL" },
  { flag: "🇸🇦", name: "Arapça", count: 67, code: "AR", href: "/search?lang=ar", certifications: "ALPT" },
  { flag: "🇨🇳", name: "Çince (Mandarin)", count: 28, code: "CN", href: "/search?lang=cn", certifications: "HSK, HSKK" },
];

const stats = [
  { end: 600, suffix: "+", label: "Dil Kursu", icon: "ph-bold ph-translate" },
  { end: 8, suffix: "", label: "Farklı Dil", icon: "ph-bold ph-globe" },
  { end: 50000, suffix: "+", label: "Mezun Öğrenci", icon: "ph-bold ph-student" },
  { end: 95, suffix: "%", label: "Memnuniyet", icon: "ph-bold ph-heart" },
];

const features = [
  {
    icon: "ph-bold ph-certificate",
    title: "Uluslararası Sertifika",
    desc: "IELTS, TOEFL, Goethe, DELE ve daha fazlası. Dünya çapında geçerli sertifika programlarına hazırlanın.",
  },
  {
    icon: "ph-bold ph-users-three",
    title: "Küçük Grup Dersleri",
    desc: "Maksimum 8–12 kişilik sınıflarda konuşma pratiği ve kişisel ilgi ile hızlı öğrenme.",
  },
  {
    icon: "ph-bold ph-monitor-play",
    title: "Online & Yüz Yüze",
    desc: "Dilediğiniz formatta, dilediğiniz tempoda öğrenin. Canlı dersler ve kayıtlı içerikler.",
  },
  {
    icon: "ph-bold ph-trend-up",
    title: "Hızlı İlerleme Garantisi",
    desc: "Kanıtlanmış metodoloji ile 3 ayda bir seviye atlayın. Ölçülebilir sonuçlar.",
  },
  {
    icon: "ph-bold ph-chats",
    title: "Native Speaker Eğitmenler",
    desc: "Ana dili o dil olan eğitmenlerle doğru telaffuz ve doğal konuşma pratiği.",
  },
  {
    icon: "ph-bold ph-device-mobile",
    title: "Mobil Uygulama Desteği",
    desc: "Mobil uygulama ile her yerden kelime çalışın, dinleme pratiği yapın.",
  },
];

const levels = [
  { level: "A1", name: "Başlangıç", desc: "Temel ifadeler ve günlük iletişim" },
  { level: "A2", name: "Temel", desc: "Basit görevler ve doğrudan iletişim" },
  { level: "B1", name: "Orta", desc: "Bağımsız genel konularda iletişim" },
  { level: "B2", name: "Orta Üstü", desc: "Akıcı ve detaylı iletişim" },
  { level: "C1", name: "İleri", desc: "Karmaşık konularda profesyonel iletişim" },
  { level: "C2", name: "Ustalaşma", desc: "Ana dil düzeyinde ustalık" },
];

const faqs = [
  {
    q: "Hangi seviyelerde dil kursu bulabilirim?",
    a: "A1'den C2'ye kadar tüm Avrupa Dil Portfolyosu seviyelerinde kurs bulabilirsiniz. Seviye belirleme testimizle size uygun seviyeyi öğrenin.",
  },
  {
    q: "Online dil kursu yüz yüze kadar etkili mi?",
    a: "Modern online eğitim araçlarıyla birçok kurum yüz yüze eğitim kadar etkili online programlar sunmaktadır. Filtreleme ile formatınızı seçebilirsiniz.",
  },
  {
    q: "Hangi sertifika sınavlarına hazırlanabilirim?",
    a: "IELTS, TOEFL, Cambridge, Goethe, TestDaF, DELE, DELF, JLPT ve daha birçok uluslararası sertifika sınavına hazırlık programları mevcuttur.",
  },
  {
    q: "Dil kursları ne kadar sürer?",
    a: "Kurs süreleri seviyeye ve yoğunluğa göre değişir. Yoğun programlar 1–3 ay, standart programlar ise 3–6 ay sürmektedir.",
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
          <h1 className="category-hero__title" data-aos="fade-up" data-aos-delay="100">
            Dünyaya Açılan Kapı: <span style={{ color: "var(--main-400)" }}>Dil Kursları</span>
          </h1>
          <p className="category-hero__desc" data-aos="fade-up" data-aos-delay="200">
            8 farklı dilde 600&apos;den fazla kurum arasından size en uygun dil kursunu seçin.
            Her seviyeye, her hedefe uygun programlar ve uluslararası geçerlilikte sertifikalar.
          </p>
          <div className="category-hero__actions" data-aos="fade-up" data-aos-delay="300">
            <Link
              href="/search"
              className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
              Dil Kursu Ara
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
          onChange={(isVisible: boolean) => { if (isVisible) setViewed(true); }}
          partialVisibility
          delayedCall
        >
          <div className="category-stats" data-aos="fade-up">
            {stats.map((s, i) => (
              <div key={i} className="category-stats__card" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="category-stats__icon">
                  <i className={s.icon} />
                </div>
                <span className="category-stats__value">
                  {viewed ? (
                    <CountUp end={s.end} duration={2.4} separator="." suffix={s.suffix} />
                  ) : ( `0${s.suffix}` )}
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
                  <span className="lang-page-grid__card-count">{lang.count} kurum</span>
                  <span className="lang-page-grid__card-certs">{lang.certifications}</span>
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
              <div key={i} className="category-levels__card" data-aos="fade-up" data-aos-delay={i * 80}>
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
            <h2 className="section-header__title">Dil Eğitiminde Fark Yaratan Özellikler</h2>
            <p className="section-header__subtitle">
              Eğitim İste ile dil öğrenmenin avantajları
            </p>
          </div>
          <div className="category-advantages__grid">
            {features.map((f, i) => (
              <div key={i} className="category-advantages__card" data-aos="fade-up" data-aos-delay={i * 80}>
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
            <p className="section-header__subtitle">Dil kursları hakkında merak ettikleriniz</p>
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
                  <i className={`ph-bold ${openFaq === i ? "ph-minus" : "ph-plus"}`} />
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
                600&apos;den fazla dil kursu arasından size en uygun programı bulun ve dünyaya kapınızı açın.
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
